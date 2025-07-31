import { collection, doc, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Save a new friend rating for a given userId
export async function saveFriendRating(userId, raterName, ratings) {
  if (!userId) throw new Error("User ID is required");
  const ratingsCollection = collection(db, "users", userId, "friendRatings");
  await addDoc(ratingsCollection, {
    raterName,
    ratings,
    createdAt: new Date(),
  });
}

// Fetch all friend ratings for a given userId
export async function fetchFriendRatings(userId) {
  if (!userId) throw new Error("User ID is required");
  const ratingsCollection = collection(db, "users", userId, "friendRatings");
  const q = query(ratingsCollection);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
