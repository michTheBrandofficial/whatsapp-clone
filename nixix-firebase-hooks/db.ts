import {
  type DocumentData,
  Query,
  onSnapshot,
  QueryDocumentSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { callSignal } from 'nixix';
import { callStore } from 'nixix';


export function callCollection<T = DocumentData>(
  query: Query<T>
  ): [
    Nixix.StoreObject<{
      docs: QueryDocumentSnapshot[] | null;
    }>,
    Nixix.SignalObject<boolean>,
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
    querySnapshot as Nixix.StoreObject<{
      docs: QueryDocumentSnapshot[] | null;
    }>,
    loadingDocs,
    listener
  ];
}
