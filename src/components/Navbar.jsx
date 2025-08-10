import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GoPremiumButton from '../payments/GoPremiumButton.jsx';
import PremiumBadge from '../premium/PremiumBadge.jsx';

// make sure Firebase is initialized
import '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const styles = {
  bar: {
    width: '100%',
    background: '#0b1a3a',
    color: 'white',
    borderBottom: '2px solid #e67300',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    gap: 12,
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 0.3,
  },
  heart: {
    display: 'inline-block',
    width: 26,
    height: 26,
    borderRadius: '6px',
    background: '#e67300',
    color: '#0b1a3a',
    fontWeight: 900,
    textAlign: 'center',
    lineHeight: '26px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 14,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    opacity: 0.9,
    padding: '8px 10px',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
  },
  linkHover: {
    background: 'rgba(255,255,255,0.08)',
    opacity: 1,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
};

function NavItem({ to, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      to={to}
      style={{ ...styles.link, ...(hover ? styles.linkHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
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

  return (
    <nav style={styles.bar}>
      <div style={styles.inner}>
        {/* Brand */}
        <Link to="/" style={styles.brandWrap} aria-label="Home">
          <span style={styles.heart}>❤</span>
          <span>DateRate</span>
        </Link>

        {/* Middle nav */}
        <div style={styles.nav}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/matches">Matches</NavItem>
          <NavItem to="/messages">Messages</NavItem>
          <NavItem to="/search">Search</NavItem>
          <NavItem to="/faq">FAQ</NavItem>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/invite">Invite</NavItem>
        </div>

        {/* Right side actions */}
        <div style={styles.right}>
          {isPremium ? <PremiumBadge /> : <GoPremiumButton label="Go Premium" />}
        </div>
      </div>
    </nav>
  );
}
