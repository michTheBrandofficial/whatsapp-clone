import { callAuthState, callCollection } from 'nixix-firebase-hooks';
import { UserAvatar } from '@assets/icons';
import auth from 'apis/auth';
import getRecEmail, { isLargeScreen } from 'utils/getRecEmail';
import { effect, callRef, type MutableRefObject } from 'nixix/primitives';
import { getDocs, query, where } from 'firebase/firestore';
import { usersDBCollection } from 'apis/db';
import { getMessagesSnapShot, mesListener, setChatScreen, setMesListener, setUserMessage, userMessage } from 'utils/reactives';

export function addUserAvater(
  parent: MutableRefObject<HTMLSpanElement>,
  { users, user }
) {
  const [recipientSnapShot, loading, listener] = callCollection(
    query(usersDBCollection, where('email', '==', getRecEmail(users, user)))
  );

  effect(() => {
    if (loading.value) {
      const rec = recipientSnapShot?.$$__value?.docs?.[0]?.data();

      rec
        ? parent.current.replaceChildren(
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={rec?.photoUrl}
                className="rounded-full w-[81%] h-[81%]"
              />
            </div>
          )
        : parent.current.replaceChildren(
            <UserAvatar
              size={50}
              className=" fill-gray-300 stroke-gray-300 p-0"
            />
          );

      listener();
    }
  });
}

export default function Chat({
  users,
  id,
}: {
  users: [string, string];
  id: string;
}) {
  const [user, loading] = callAuthState(auth);
  const emailContainer = callRef<HTMLSpanElement>();
  const userAvatarContainer = callRef<HTMLSpanElement>();

  effect(() => {
    if (loading.value) {
      emailContainer.current.replaceChildren(
        <p className="font-semibold">{getRecEmail(users, user)}</p>
      );

      addUserAvater(userAvatarContainer, { users, user });
    }
  });

  async function enterChat() {
    history.pushState({}, null, `/chats/${id}`);
    const QUERY = query(usersDBCollection, where('email', '==', getRecEmail(users, user)))
    
    setMesListener(false)
    const docsFromQuery = await getDocs(QUERY);
    const photoUrl = docsFromQuery?.docs?.[0]?.data()?.photoUrl;

    getMessagesSnapShot(id);
    setUserMessage(() => {
      return {user: user.$$__value.email, message: {
        messageBody: ''
      }, timestamp: 0}
    })
    setChatScreen({
      display: 'flex',
      flexGrow: '0',
      recEmail: getRecEmail(users, user),
      photoUrl: photoUrl ? photoUrl : null,
      sidebarDisplay: !(isLargeScreen()) ? 'none' : 'block',
    });
  }

  return (
    <section
      className="flex w-full items-center cursor-pointer break-words p-[15px] hover:bg-gray-200"
      on:click={enterChat}
    >
      <span
        bind:ref={userAvatarContainer}
        className="my-[5px] mr-[15px] w-[50px] h-[50px] rounded-full "
      >
        <p className="load w-[81%] h-[81%] rounded-full"></p>
      </span>
      <span bind:ref={emailContainer}></span>
    </section>
  );
}
