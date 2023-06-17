import refs from './refs';
import { UserAvatar } from '@assets/icons';
import { effect, callStore, callSignal } from 'nixix/primitives';
import {
  query,
  collection,
  orderBy,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { callCollection } from 'nixix-firebase-hooks';
import db, { userDBChatCollection } from 'apis/db';

const chatScreenStore: ChatScreenStore = {
  display: 'none',
  flexGrow: '1',
  recEmail: 'Rec Email',
  photoUrl: null,
};

export const [chatScreen, setChatScreen] = callStore(chatScreenStore);

// Finish up the rest tomorrow!!!!
effect(() => {
  if (chatScreen.$$__value.photoUrl !== null) {
    refs.chatScreenUserAvatar.current.replaceChildren(
      <img
        src={chatScreen.$$__value.photoUrl}
        className="rounded-full w-[35px] h-[35px]"
      />
    );
  } else {
    ``;
    refs.chatScreenUserAvatar.current.replaceChildren(
      <UserAvatar size={35} className="fill-blue-500 m-0 cursor-pointer" />
    );
  }
});

// delete that shit

export const [userMessage, setUserMessage] = callStore({
  user: '',
  message: {
  },
  timestamp: serverTimestamp(),
} as MessageProp);

export const [messages, setMessages] = callStore([] as MessageProp[]);
export const [mesListener, setMesListener] = callSignal(true);
export function getMessagesSnapShot(id: string, meslistener = mesListener) {
  if (id) {
    setMesListener(true);
    const [messagesSnapshot, loading, listener] = callCollection(
      query(collection(db, `${userDBChatCollection.path}/${id}/messages`), orderBy('timestamp', 'asc'))
    );
    effect(
      () => {
        if (meslistener.value === false) {
          listener();
          loading.value = false;
          // get a function that removes signals manually.
          // @ts-ignore
          delete window.$$__NixixStore.Store[`_${loading.$$__id}_`];
        }

        if (loading.value) {
          setMessages(() => {
            const messages = messagesSnapshot.$$__value.docs.map(
              (message): MessageProp => {
                return message.data() as MessageProp;
              }
            );
            return messages;
          });
        }
      },
      null,
      [mesListener]
    );
    return messagesSnapshot;
  } else {
    return undefined;
  }
}
