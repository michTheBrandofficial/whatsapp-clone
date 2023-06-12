import { type User } from "firebase/auth";
export {};

declare global {
  interface UsersChatsType {
    users: [string, string]
  }

  interface AllChats {
    id: string;
    data: UsersChatsType;
  }

  interface UserProp {
    user: Nixix.StoreObject<User>
  }

  interface MessageProp {

  }

  interface ChatScreenStore {
    display: 'none' | 'flex',
    flexGrow: '1' | '0',
    recEmail: string,
    photoUrl: string | null
  }
}
