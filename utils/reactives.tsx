import { effect, callStore  } from 'nixix';
import refs from './refs';
import { UserAvatar } from '@assets/icons';

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
    console.log('babe');
    refs.chatScreenUserAvatar.current.replaceChildren(
      <UserAvatar size={35} className="fill-blue-500 m-0 cursor-pointer" />
    );
  }
});
