// /src/ratings/RatingForm.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { submitRating } from './submitRating';
import './RatingForm.css';

export default function RatingForm() {
  const { inviteId } = useParams();
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await submitRating({
        inviteId,
        ratedUserId: 'TEMP_USER_ID', // TODO: Replace with actual rated user's UID from invite lookup
        score,
        comment,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (submitted) {
    return <div className="rating-success">✅ Thank you for your rating!</div>;
  }

  return (
    <div className="rating-form-container">
      <h2>Rate This User</h2>
      <form onSubmit={handleSubmit} className="rating-form">
        <label>Score (1-10):</label>
        <input
          type="number"
          min="1"
          max="10"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          required
        />

        <label>Comment (optional):</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit-btn">Submit Rating</button>
      </form>
    </div>
  );
}
