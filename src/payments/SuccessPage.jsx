import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api/base';

// Ensure Firebase app is initialized
import '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function SuccessPage() {
  const [status, setStatus] = useState('loading');
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (!sessionId) {
      setStatus('error');
      setError('Missing session_id in URL.');
      return;
    }

    // 1) Verify the session with the backend (prevents spoofing)
    fetch(`${API_BASE}/api/stripe/session?id=${encodeURIComponent(sessionId)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(async (data) => {
        if (!data.ok) throw new Error(data.error || 'Verification failed');
        setDetails(data);
        setStatus('ok');

        // 2) If paid, flip the current user to premium in Firestore
        if (data.payment_status === 'paid') {
          const auth = getAuth();
          const db = getFirestore();

          await new Promise((resolve) => {
            const unsub = onAuthStateChanged(auth, async (user) => {
              unsub();
              if (!user) {
                setSaved(false);
                setError('You are not signed in, so we could not mark your account as premium.');
                return resolve();
              }
              try {
                await setDoc(
                  doc(db, 'users', user.uid),
                  {
                    premium: true,
                    premiumPlan: 'monthly',
                    premiumSince: serverTimestamp(),
                    stripe: {
                      sessionId: data.id,
                      subscriptionId: data.subscription || null,
                      mode: data.mode,
                      status: data.status,
                      payment_status: data.payment_status,
                    },
                  },
                  { merge: true }
                );
                setSaved(true);
                resolve();
              } catch (e) {
                setSaved(false);
                setError(e.message || 'Failed to update your premium status.');
                resolve();
              }
            });
          });
        }
      })
      .catch((e) => {
        setStatus('error');
        setError(e.message || 'Request failed');
      });
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '40px auto', color: '#0b1a3a' }}>
      <h1 style={{ marginBottom: 8 }}>Payment Success</h1>

      {status === 'loading' && <p>Verifying your subscription…</p>}

      {status === 'ok' && (
        <>
          <p>You're all set. 🎉</p>
          {saved ? (
            <p style={{ fontWeight: 700, color: '#2e7d32' }}>Your account has been marked as Premium.</p>
          ) : (
            <p style={{ color: '#b26a00' }}>
              Premium status not saved yet {error ? `— ${error}` : ''}.
              {` `}
              Try refreshing while signed in.
            </p>
          )}
          <pre
            style={{
              background: '#f5f7fb',
              border: '1px solid #e2e8f0',
              padding: 12,
              borderRadius: 10,
              overflowX: 'auto',
            }}
          >
{JSON.stringify(
  {
    id: details?.id,
    status: details?.status,
    payment_status: details?.payment_status,
    mode: details?.mode,
    subscription: details?.subscription,
  },
  null,
  2
)}
          </pre>
          <a href="/" style={{ display: 'inline-block', marginTop: 12, color: '#e67300', fontWeight: 700 }}>
            Go to Home
          </a>
        </>
      )}

      {status === 'error' && (
        <>
          <p style={{ color: '#b00020' }}>We couldn’t verify your session.</p>
          <pre
            style={{
              background: '#fff5f5',
              border: '1px solid #ffc9c9',
              padding: 12,
              borderRadius: 10,
              overflowX: 'auto',
            }}
          >
{error}
          </pre>
          <a href="/" style={{ display: 'inline-block', marginTop: 12, color: '#e67300', fontWeight: 700 }}>
            Try Again
          </a>
        </>
      )}
    </div>
  );
}
