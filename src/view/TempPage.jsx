import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './ViewProfilePage.css';

const ViewProfilePage = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    if (uid) fetchUserData();
  }, [uid]);

  const handleMessage = () => {
    navigate(`/messaging/${uid}`);
  };

  const handleInvite = () => {
    navigate(`/invitations/send/${uid}`);
  };

  const convertInchesToFeetInches = (inches) => {
    const ft = Math.floor(inches / 12);
    const inch = inches % 12;
    return `${ft}'${inch}"`;
  };

  if (!userData) {
    return <div className="view-profile-container">Loading profile...</div>;
  }

  return (
    <div className="view-profile-container">
      <div className="profile-header">
        <img src={userData.photoURL || '/default-avatar.png'} alt={`${userData.name}'s profile`} />
        <h2>{userData.name}</h2>
        <p>{userData.age} • {userData.city}</p>
        {userData.premium && <span className="boosted-badge">Premium Member</span>}
      </div>

      <div className="profile-details">
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Ethnicity:</strong> {userData.ethnicity || 'Not specified'}</p>
        <p><strong>Religion:</strong> {userData.religion || 'Not specified'}</p>
        <p><strong>Hair Color:</strong> {userData.hairColor || 'Not specified'}</p>
        <p><strong>Height:</strong> {userData.height ? convertInchesToFeetInches(userData.height) : 'Not specified'}</p>
        <p><strong>Weight:</strong> {userData.weight || 'Not specified'} lbs</p>
        <p><strong>Body Type:</strong> {userData.bodyType || 'Not specified'}</p>
        <p><strong>About:</strong> {userData.bio || 'No bio available.'}</p>
      </div>

      <div className="profile-actions">
        <button onClick={handleMessage}>Message</button>
        <button onClick={handleInvite}>Send Invite</button>
      </div>
    </div>
  );
};

export default ViewProfilePage;
