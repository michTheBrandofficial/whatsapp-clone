import { effect } from 'nixix/primitives';
import { Route, Routes, Router } from 'nixix/router';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import auth from 'apis/auth';
import db, { usersDBCollection } from 'apis/db';
import { callAuthState } from 'nixix-firebase-hooks/auth';
import Chats from 'pages/chats';
import Login from 'pages/login';
import Whatsapp from 'pages/whatsapp';
import './index.css';
import refs from 'utils/refs';
import { UserAvatar } from '@assets/icons';

function App() {
  const [user, userLoggedIn] = callAuthState(auth);

  effect(async () => {
    if (userLoggedIn.value === true) {
      const userDetails = {
        email: user.$$__value.email,
        lastSeen: serverTimestamp(),
        photoUrl: user.$$__value.photoURL,
      };

      const uidDoc = doc(db, `${usersDBCollection.path}/${user.$$__value.uid}`);
      const userDoc = await getDoc(uidDoc);

      userDoc.exists()
        ? updateDoc(uidDoc, userDetails)
        : setDoc(uidDoc, userDetails);

      refs.userAvatar.current.replaceChildren(
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={userDetails?.photoUrl}
            className="rounded-full w-[81%] h-[81%]"
          />
        </div>
      );

      Router.push('/chats');
    } else {
      refs.userAvatar.current.replaceChildren(
        <UserAvatar
          size={50}
          className="fill-gray-400 stroke-gray-100 m-0 cursor-pointer"
        />
      );
    }
  });

  function checkUser() {
    return userLoggedIn.value ? '/chats' : '/login';
  }
  return (
    <Routes callback={checkUser} >
      <Route element={<Whatsapp />} />
      <Route element={<Chats user={user} />} path="/chats" />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
