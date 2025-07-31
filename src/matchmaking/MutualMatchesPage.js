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

const MutualMatchesPage = () => {
  const [mutuals, setMutuals] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMutualMatches = async () => {
      const ratingsSnap = await getDocs(collection(db, 'ratings'));
      const userSnap = await getDoc(doc(db, 'users', currentUserId));
      const user = userSnap.data();
      const blocked = user.blockedUsers || [];
      const favs = user.favorites || [];
      setBlockedUsers(blocked);
      setFavorites(favs);

      const liked = new Set();
      const likedMe = new Set();

      ratingsSnap.docs.forEach(docSnap => {
        const data = docSnap.data();
        if (data.fromUserId === currentUserId && data.rating >= 4) {
          liked.add(data.toUserId);
        }
        if (data.toUserId === currentUserId && data.rating >= 4) {
          likedMe.add(data.fromUserId);
        }
      });

      const mutualIds = [...liked].filter(id => likedMe.has(id) && !blocked.includes(id));
      const userSnaps = await Promise.all(mutualIds.map(id => getDoc(doc(db, 'users', id))));

      const mutualUsers = userSnaps
        .filter(snap => snap.exists())
        .map(snap => ({ id: snap.id, ...snap.data() }))
        .map(user => ({ ...user, _score: calculateCompleteness(user) }))
        .sort((a, b) => b._score - a._score);

      setMutuals(mutualUsers);
    };

    fetchMutualMatches();
  }, []);

  const blockUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', currentUserId);
      const snap = await getDoc(userRef);
      const data = snap.data();
      const updated = [...(data.blockedUsers || []), userId];

      await setDoc(userRef, { blockedUsers: updated }, { merge: true });
      setBlockedUsers(updated);
      setMutuals(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error blocking user:', err);
    }
  };

  const toggleFavorite = async (userId) => {
    try {
      const userRef = doc(db, 'users', currentUserId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      const currentFavs = userData.favorites || [];

      const updated = currentFavs.includes(userId)
        ? currentFavs.filter((id) => id !== userId)
        : [...currentFavs, userId];

      await setDoc(userRef, { favorites: updated }, { merge: true });
      setFavorites(updated);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Mutual Matches</h2>
      {mutuals.length === 0 ? (
        <p style={styles.meta}>No mutual likes yet. Keep exploring!</p>
      ) : (
        mutuals.map(user => (
          <div key={user.id} style={styles.card}>
            <img src={user.photoURL || 'https://via.placeholder.com/80'} alt={user.name} style={styles.avatar} />
            <div>
              <p style={styles.name}>{user.name || 'Unnamed'}</p>
              <p style={styles.meta}>⭐ {user.rating?.toFixed(1) || 'N/A'} • {user.gender || 'N/A'}</p>
              <button onClick={() => navigate(`/messages/${user.id}`)} style={styles.button}>Message</button>
              <button onClick={() => blockUser(user.id)} style={{ ...styles.button, backgroundColor: 'red', marginLeft: '1rem' }}>Block</button>
              <button
                onClick={() => toggleFavorite(user.id)}
                style={{
                  ...styles.button,
                  backgroundColor: favorites.includes(user.id) ? '#555' : '#ffa500',
                  marginLeft: '1rem',
                }}
              >
                {favorites.includes(user.id) ? 'Unfavorite' : 'Favorite'}
              </button>
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

export default MutualMatchesPage;
