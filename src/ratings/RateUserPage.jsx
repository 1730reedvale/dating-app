// /src/ratings/RateUserPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { submitRating } from './submitRating';
import './RateUserPage.css';

const RateUserPage = () => {
  const { inviteId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);
  const [score, setScore] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  // Load invite details to determine who is being rated
  useEffect(() => {
    const loadInvite = async () => {
      try {
        if (!inviteId) throw new Error('Missing inviteId.');
        const ref = doc(db, 'invites', inviteId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          throw new Error('Invalid or expired invite.');
        }
        setInvite({ id: inviteId, ...snap.data() }); // includes senderId, contactName, etc.
      } catch (e) {
        console.error(e);
        setError(e.message || 'Problem loading invite.');
      } finally {
        setLoading(false);
      }
    };
    loadInvite();
  }, [inviteId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!invite?.senderId) {
        throw new Error('Invite is missing the senderId (rated user).');
      }
      if (Number.isNaN(score) || score < 1 || score > 10) {
        throw new Error('Please provide a score between 1 and 10.');
      }

      await submitRating(
        invite.senderId,
        { score: Number(score), review, inviteId },
        inviteId
      );

      navigate(`/rating-received/${inviteId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not submit rating.');
    }
  };

  if (loading) {
    return (
      <div className="rate-page">
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rate-page">
        <p style={{ color: '#ffd1d1' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="rate-page">
      <h2>Rate {invite?.contactName || 'this user'}</h2>

      <form onSubmit={onSubmit}>
        <label>
          Score (1–10)
          <input
            type="number"
            min="1"
            max="10"
            value={score}
            onChange={(e) => setScore(e.target.value ? Number(e.target.value) : 0)}
            required
          />
        </label>

        <label>
          Optional feedback
          <textarea
            placeholder="Be honest and helpful…"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>

        {error && <div style={{ color: '#ffd1d1' }}>{error}</div>}

        <button type="submit" disabled={score < 1 || score > 10}>
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RateUserPage;
