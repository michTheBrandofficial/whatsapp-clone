import { type StoreObject } from 'nixix/primitives';
import { type User } from 'firebase/auth';
import { FieldValue } from 'firebase/firestore';
export {};


declare global {
  interface UsersChatsType {
    users: [string, string];
  }

  interface AllChats {
    id: string;
    data: UsersChatsType;
  }

  interface UserProp {
    user: StoreObject<User>;
  }

  interface MessageProp {
    user: string;
    message: {
      messageBody?: string;
    };
    timestamp: FieldValue | number;
  }

  interface ChatScreenStore {
    display: 'none' | 'flex';
    flexGrow: '1' | '0';
    recEmail: string;
    photoUrl: string | null;
  }
}
