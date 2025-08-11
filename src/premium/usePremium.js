import { useEffect, useState } from 'react';
import '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function usePremium() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsPremium(false);
        setLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(Boolean(snap.exists() && snap.data()?.premium));
      } catch {
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { isPremium, loading };
}
