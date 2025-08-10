// /src/ratings/recordResponse.js
import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';

/**
 * Records a user's rating for another user and marks the invite as responded.
 *
 * @param {Object} data
 * @param {string} data.inviteId - The unique invite identifier
 * @param {string} data.ratedUserId - UID of the user being rated
 * @param {string} data.raterName - Name of the person leaving the rating
 * @param {number} data.score - Rating score (1–5, etc.)
 * @param {string} [data.comment] - Optional comment from the rater
 */
export async function recordRatingResponse({ inviteId, ratedUserId, raterName, score, comment }) {
  if (!inviteId || !ratedUserId || !raterName || typeof score !== 'number') {
    throw new Error('Missing required fields for recording rating.');
  }

  // Store the rating in the 'ratings' collection
  await addDoc(collection(db, 'ratings'), {
    inviteId,
    ratedUserId,
    raterName,
    score,
    comment: comment || '',
    createdAt: serverTimestamp(),
  });

  // Mark the invite as responded
  const inviteRef = doc(db, 'invites', inviteId);
  await updateDoc(inviteRef, {
    status: 'responded',
    respondedAt: serverTimestamp(),
  });
}
