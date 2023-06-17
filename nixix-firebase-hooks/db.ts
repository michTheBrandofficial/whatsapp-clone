import {
  type DocumentData,
  Query,
  onSnapshot,
  QueryDocumentSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { callSignal, callStore, type StoreObject, type SignalObject } from 'nixix/primitives';


export function callCollection<T = DocumentData>(
  query: Query<T>
  ): [
    StoreObject<{
      docs: QueryDocumentSnapshot[] | null;
    }>,
    SignalObject<boolean>,
    Unsubscribe
  ] {
  const [loadingDocs, setLoadingDocs] = callSignal(false);
  const [querySnapshot, setQuerySnapshot] = callStore<{
    docs: QueryDocumentSnapshot[] | null;
  }>({ docs: null });
  const listener = onSnapshot(query, (snapshot) => {
    setLoadingDocs(true)
    setQuerySnapshot({docs: snapshot.docs})
    setLoadingDocs(false)
  });

  return [
    querySnapshot as StoreObject<{
      docs: QueryDocumentSnapshot[] | null;
    }>,
    loadingDocs,
    listener
  ];
}
