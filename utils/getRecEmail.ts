import { type User } from "firebase/auth";

export default function getRecEmail(users: [string, string], loggedInUser: Nixix.StoreObject<User>) {
  return users.filter(userToFilter => userToFilter !== loggedInUser.$$__value.email)[0]
};
