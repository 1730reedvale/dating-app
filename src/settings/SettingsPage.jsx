import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

const currentUserId = 'cGTsloYaSXXwLGiiwSfZBLdinhk2';

const SettingsPage = () => {
  const [orientation, setOrientation] = useState('straight');
  const [hidden, setHidden] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedProfiles, setBlockedProfiles] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const snap = await getDoc(doc(db, 'users', currentUserId));
      if (snap.exists()) {
        const user = snap.data();
        setOrientation(user.orientation || 'straight');
        setHidden(user.preferences?.hiddenFromSearch || false);
        setBlockedUsers(user.blockedUsers || []);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchBlockedProfiles = async () => {
      const allUsers = await getDocs(collection(db, 'users'));
      const list = allUsers.docs
        .filter(doc => blockedUsers.includes(doc.id))
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setBlockedProfiles(list);
    };
    if (blockedUsers.length > 0) {
      fetchBlockedProfiles();
    } else {
      setBlockedProfiles([]);
    }
  }, [blockedUsers]);

  const saveSettings = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUserId), {
        orientation,
        preferences: {
          hiddenFromSearch: hidden,
        },
      });
      alert('Settings saved!');
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Failed to save settings.');
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const updated = blockedUsers.filter(id => id !== userId);
      await updateDoc(doc(db, 'users', currentUserId), {
        blockedUsers: updated,
      });
      setBlockedUsers(updated);
    } catch (err) {
      console.error('Error unblocking user:', err);
      alert('Failed to unblock user.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Account Settings</h2>

      <div style={styles.section}>
        <label style={styles.label}>Orientation:</label>
        <select value={orientation} onChange={(e) => setOrientation(e.target.value)} style={styles.input}>
          <option value="straight">Straight</option>
          <option value="gay">Gay</option>
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Hide Me from Search:</label>
        <input
          type="checkbox"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          style={{ transform: 'scale(1.5)' }}
        />
      </div>

      <button onClick={saveSettings} style={styles.button}>Save Settings</button>

      {blockedProfiles.length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.subheading}>Blocked Users</h3>
          {blockedProfiles.map(user => (
            <div key={user.id} style={styles.blockedCard}>
              <img src={user.photoURL || 'https://via.placeholder.com/50'} alt={user.name} style={styles.avatar} />
              <span style={styles.blockedName}>{user.name || 'Unnamed'}</span>
              <button onClick={() => handleUnblock(user.id)} style={styles.unblockButton}>Unblock</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#1e2a38',
    color: '#fff',
    minHeight: '100vh',
    padding: '2rem',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  section: {
    marginBottom: '2rem',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    width: '100%',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#ffa500',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '2rem auto 0',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #555',
    paddingBottom: '0.5rem',
  },
  blockedCard: {
    backgroundColor: '#2c3e50',
    borderRadius: '8px',
    padding: '0.8rem',
    marginBottom: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  blockedName: {
    flex: 1,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  unblockButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4444',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default SettingsPage;
