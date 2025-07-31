import { db } from "../../firebase"; // adjust path as needed
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

/**
 * Applies decay to friend and date ratings older than threshold.
 */
export const applyRatingsDecay = async () => {
  const decayThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
  const now = Date.now();

  const friendRatingsRef = collection(db, "friendRatings");
  const dateRatingsRef = collection(db, "dateRatings");

  const processRatings = async (ratingsRef) => {
    const snapshot = await getDocs(ratingsRef);
    snapshot.forEach(async (docSnap) => {
      const data = docSnap.data();
      const ratingAge = now - data.createdAt.toMillis();
      if (ratingAge > decayThreshold) {
        const decayFactor = 0.9; // example decay factor
        const decayedAnswers = data.answers.map((score) => score * decayFactor);
        const docRef = doc(db, ratingsRef.path, docSnap.id);
        await updateDoc(docRef, { answers: decayedAnswers });
      }
    });
  };

  await processRatings(friendRatingsRef);
  await processRatings(dateRatingsRef);
};
