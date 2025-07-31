import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

/**
 * Add a favorite: current user favorites targetUserId
 */
export const addFavorite = async (targetUserId) => {
  if (!auth.currentUser) throw new Error("User not logged in");
  const favDocRef = doc(db, "favorites", `${auth.currentUser.uid}_${targetUserId}`);
  await setDoc(favDocRef, {
    fromUserId: auth.currentUser.uid,
    toUserId: targetUserId,
    timestamp: new Date(),
  });
};

/**
 * Get a list of user IDs that current user has favorited
 */
export const getFavoritesByUser = async (userId) => {
  const q = query(collection(db, "favorites"), where("fromUserId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data().toUserId);
};

/**
 * Get a list of mutual matches for current user
 * i.e., users that current user favorited AND who favorited current user back
 */
export const getMutualMatches = async () => {
  if (!auth.currentUser) throw new Error("User not logged in");
  const currentUserId = auth.currentUser.uid;

  // Users current user favorited
  const userFavorites = await getFavoritesByUser(currentUserId);

  if (userFavorites.length === 0) return [];

  // Check who favorited current user
  const q = query(
    collection(db, "favorites"),
    where("fromUserId", "in", userFavorites),
    where("toUserId", "==", currentUserId)
  );
  const querySnapshot = await getDocs(q);

  // The fromUserId in these docs are users who favorited current user back
  const mutualUserIds = querySnapshot.docs.map((doc) => doc.data().fromUserId);

  return mutualUserIds;
};
