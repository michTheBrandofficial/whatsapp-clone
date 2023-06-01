import { type User } from 'firebase/auth';
import init from './firebase';
import { type Query, addDoc, collection, getFirestore, getDocs } from 'firebase/firestore';

const db = getFirestore(init());

export const usersDBCollection = collection(db, 'users');
export const userDBChatCollection = collection(db, 'chats');

export const createChatDB = (user: Nixix.StoreObject<User>, input: string) => {
  addDoc(userDBChatCollection, {
    users: [user.$$__value.email, input]
  })
};

export default db;
