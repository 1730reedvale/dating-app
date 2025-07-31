import React, { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RatingForm = ({ targetUserId }) => {
  const [selected, setSelected] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = async (ratingValue) => {
    if (submitted) return;

    const userRef = doc(db, 'users', targetUserId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const ratings = data.ratings || { totalScore: 0, count: 0 };

      const newTotal = ratings.totalScore + ratingValue;
      const newCount = ratings.count + 1;

      await updateDoc(userRef, {
        ratings: {
          totalScore: newTotal,
          count: newCount,
        },
      });

      setSelected(ratingValue);
      setSubmitted(true);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((val) => (
      <span
        key={val}
        style={{
          fontSize: '1.8rem',
          cursor: submitted ? 'default' : 'pointer',
          color: val <= selected ? '#FFA500' : '#ccc',
          marginRight: '5px',
        }}
        onClick={() => handleRate(val)}
      >
        ★
      </span>
    ));
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h4>Rate this user</h4>
      {submitted ? (
        <p style={{ color: '#FFA500' }}>Thank you for rating!</p>
      ) : (
        <div>{renderStars()}</div>
      )}
    </div>
  );
};

export default RatingForm;
