import React, { useEffect, useState } from 'react';

// ensure Firebase is initialized
import '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function PremiumBadge() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return setIsPremium(false);
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(Boolean(snap.exists() && snap.data()?.premium));
      } catch {
        setIsPremium(false);
      }
    });

    return () => unsub();
  }, []);

  if (!isPremium) return null;

  return (
    <span
      style={{
        padding: '6px 10px',
        borderRadius: 999,
        background: '#e67300',
        color: 'white',
        fontWeight: 700,
        fontSize: 12,
      }}
      aria-label="Premium account"
      title="Premium account"
    >
      PREMIUM
    </span>
  );
}
