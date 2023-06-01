import { type User, type Auth, onAuthStateChanged } from 'firebase/auth';
import { callSignal, callStore } from 'nixix';

// returns the authState and userLoggedIn reactive objects.
export const callAuthState = (
  auth: Auth
): [Nixix.StoreObject<User>, Nixix.SignalObject<boolean>] | [null] => {
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
  return [authState as Nixix.StoreObject<User>, userLoggedIn];
};
