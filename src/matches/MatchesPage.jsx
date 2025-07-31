import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './MatchesPage.css';

const MatchesPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesRef = collection(db, 'matches');
        const q = query(matchesRef, where('users', 'array-contains', currentUser.uid));
        const querySnapshot = await getDocs(q);

        const matchedUserIds = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const otherUserId = data.users.find(uid => uid !== currentUser.uid);
          if (otherUserId) matchedUserIds.push(otherUserId);
        });

        const usersRef = collection(db, 'users');
        const matchedUsersData = [];
        for (const uid of matchedUserIds) {
          const q = query(usersRef, where('uid', '==', uid));
          const userSnap = await getDocs(q);
          userSnap.forEach(doc => matchedUsersData.push(doc.data()));
        }

        setMatches(matchedUsersData);
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    };

    if (currentUser?.uid) {
      fetchMatches();
    }
  }, [currentUser]);

  const handleViewProfile = (uid) => {
    navigate(`/view/${uid}`);
  };

  return (
    <div className="matches-container">
      <h2>Your Matches</h2>
      <div className="matches-list">
        {matches.map(user => (
          <div key={user.uid} className="match-card" onClick={() => handleViewProfile(user.uid)}>
            <img src={user.photoURL || '/default-avatar.png'} alt={`${user.name}'s avatar`} />
            <div className="match-info">
              <h3>{user.name}</h3>
              <p>{user.age} • {user.city}</p>
              {user.premium && <span className="boosted-badge">Premium</span>}
            </div>
          </div>
        ))}
        {matches.length === 0 && (
          <p className="no-matches">No matches yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
