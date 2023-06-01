import { callAuthState, callCollection } from 'nixix-firebase-hooks';
import { UserAvatar } from '@assets/icons';
import auth from 'apis/auth';
import getRecEmail from 'utils/getRecEmail';
import { effect, callRef } from 'nixix';
import { query, where } from 'firebase/firestore';
import { usersDBCollection } from 'apis/db';
import { setChatScreen } from 'utils/reactives';

export function addUserAvater(
  parent: Nixix.MutableRefObject<HTMLSpanElement>,
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

export default function Chat({ users, id }: { users: [string, string], id: string }) {
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
  return (
    <section
      className="flex w-full items-center cursor-pointer break-words p-[15px] hover:bg-gray-200"
      on:click={() => {
        history.pushState({}, null, `/chats/${id}`)
        setChatScreen({
          display: 'flex',
          flexGrow: '0',
        });
      }}
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
