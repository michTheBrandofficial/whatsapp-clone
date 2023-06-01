import { callStore } from 'nixix';

export const [chatScreen, setChatScreen] = callStore({
  display: 'none',
  flexGrow: '1',
});
