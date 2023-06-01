import { Router } from 'nixix/router';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut as signUserOut } from 'firebase/auth';
import init from "./firebase";

const auth = getAuth(init());
const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile');

// signs user in and redirects to chats page
export async function signIn() {
  try {
    const userCred = await signInWithPopup(auth, provider);
    Router.push('/chats');
    return userCred;
  } catch (err) {
    return 404;
  }
}

// function to sign user out and redirect to login page.
export async function signOut() {
  await signUserOut(auth)
  Router.push('/login');
}

export default auth;