import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const currentUserId = 'cGTsloYaSXXwLGiiwSfZBLdinhk2';

const calculateCompleteness = (profile) => {
  const fields = [
    'name', 'photoURL', 'age', 'gender', 'sex', 'height', 'weight',
    'hairColor', 'nationality', 'religion', 'hobbies', 'bio', 'location'
  ];
  const filled = fields.filter(field => {
    const val = profile?.[field];
    return val !== undefined && val !== null && val !== '';
  });
  return Math.round((filled.length / fields.length) * 100);
};

const OnlineUsersPage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const userSnap = await getDoc(doc(db, 'users', currentUserId));
      if (!userSnap.exists()) return;

      const user = userSnap.data();
      const blocked = user.blockedUsers || [];
      setBlockedUsers(blocked);

      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u =>
          u.id !== currentUserId &&
          u.online === true &&
          !blocked.includes(u.id) &&
          !u.preferences?.hiddenFromSearch
        )
        .map(u => ({ ...u, _score: calculateCompleteness(u) }))
        .sort((a, b) => b._score - a._score);

      setOnlineUsers(users);
    };

    fetchOnlineUsers();
  }, []);

  const blockUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', currentUserId);
      const snap = await getDoc(userRef);
      const data = snap.data();
      const updated = [...(data.blockedUsers || []), userId];

      await setDoc(userRef, { blockedUsers: updated }, { merge: true });
      setBlockedUsers(updated);
      setOnlineUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error('Error blocking user:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Who's Online</h2>
      {onlineUsers.length === 0 ? (
        <p style={styles.meta}>No one is currently online.</p>
      ) : (
        onlineUsers.map(user => (
          <div key={user.id} style={styles.card}>
            <img
              src={user.photoURL || 'https://via.placeholder.com/80'}
              alt={user.name}
              style={styles.avatar}
            />
            <div>
              <p style={styles.name}>{user.name || 'Unnamed'}</p>
              <p style={styles.meta}>
                {user.gender || 'N/A'} • ⭐ {user.rating?.toFixed(1) || 'N/A'}
              </p>
              <button onClick={() => navigate(`/messages/${user.id}`)} style={styles.button}>Message</button>
              <button onClick={() => blockUser(user.id)} style={{ ...styles.button, backgroundColor: 'red', marginLeft: '1rem' }}>Block</button>
            </div>
          </div>
        ))
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
    textAlign: 'center',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#2c3e50',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '10px',
    margin: '1rem auto',
    maxWidth: '600px',
    gap: '1rem',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
  },
  meta: {
    fontSize: '0.9rem',
    color: '#bbb',
    margin: '0.2rem 0',
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    backgroundColor: '#ffa500',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default OnlineUsersPage;
