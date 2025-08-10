// /src/ratings/submitRating.js
import { db } from '../firebase/firebase';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Submits a rating for a user and marks invite as responded (if applicable).
 * @param {string} ratedUserId - The ID of the user being rated.
 * @param {Object} ratingData - The rating details { score, review, inviteId }.
 * @param {string} [inviteId] - Optional inviteId to track who responded.
 * @returns {Promise<void>}
 */
export const submitRating = async (ratedUserId, ratingData, inviteId = null) => {
  try {
    const ratingRef = doc(db, 'ratings', `${ratedUserId}_${Date.now()}`);
    await setDoc(ratingRef, {
      ratedUserId,
      score: ratingData.score,
      review: ratingData.review || '',
      createdAt: serverTimestamp(),
    });

    if (inviteId) {
      const inviteRef = doc(db, 'invites', inviteId);
      await updateDoc(inviteRef, {
        status: 'responded',
        respondedAt: serverTimestamp(),
      });
    }

    console.log(`✅ Rating submitted for user ${ratedUserId}`);
  } catch (error) {
    console.error('❌ Error submitting rating:', error);
    throw error;
  }
};
