import { type User, type Auth, onAuthStateChanged } from 'firebase/auth';
import { callSignal, callStore, type StoreObject, type SignalObject } from 'nixix/primitives';

// returns the authState and userLoggedIn reactive objects.
export const callAuthState = (
  auth: Auth
): [StoreObject<User>, SignalObject<boolean>] => {
  const [authState, setAuthState] = callStore({$$__user: null} as unknown as User);
  const [userLoggedIn, setUserLoggedIn] = callSignal(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthState(user);
      setUserLoggedIn(true);
    } else {
      setAuthState({} as User);
      setUserLoggedIn(false);
    }
  });
  return [authState as StoreObject<User>, userLoggedIn];
};
