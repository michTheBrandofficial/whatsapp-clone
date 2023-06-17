import { createChatDB } from "apis/db";
import { validate } from "email-validator";
import { type User } from "firebase/auth";
import { type QueryDocumentSnapshot, type DocumentData } from "firebase/firestore";
import { type StoreObject } from "nixix/primitives";

export function createChat({user, chatSnapShots}: {user: StoreObject<User>, chatSnapShots: StoreObject<{
  docs: QueryDocumentSnapshot<DocumentData>[];
}>}) {
  
  return (async function () {
  
    const input = prompt(
      'Please enter an email address for the user you wish to chat with.'
    );
  
    if (!input) return null;
  
    // if the chat doesn't already exist and is valid add the chat to the DB
    if (
      validate(input) &&
      !(chatAlreadyExists(input, chatSnapShots, user)) &&
      input !== user.email
    ) {
      createChatDB(user, input);
    }
  })

}

export function chatAlreadyExists(recEmail: string, chatSnapShots: StoreObject<{
  docs: QueryDocumentSnapshot<DocumentData>[];
}>, user: StoreObject<User>): boolean {
  
  const arrayOfChats = chatSnapShots.$$__value.docs.map(doc => doc.data().users) as [string, string][];
  const value = arrayOfChats.filter((arrayofChat) => {
    return arrayofChat.includes(recEmail) && arrayofChat.includes(user.$$__value.email)
  })
  return value.length > 0;

}