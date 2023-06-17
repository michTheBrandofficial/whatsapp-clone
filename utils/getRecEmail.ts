import { type User } from 'firebase/auth';
import { type StoreObject } from 'nixix/primitives';

export default function getRecEmail(
  users: [string, string],
  loggedInUser: StoreObject<User>
) {
  return users.filter(
    (userToFilter) => userToFilter !== loggedInUser.$$__value.email
  )[0];
}

export function getId() {
  return window.location.pathname.replace('/chats/', '');
}

export function isLargeScreen() {
  return innerWidth >= 768;
}
