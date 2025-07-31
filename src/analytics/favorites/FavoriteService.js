import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * Adds a user to the current user's favorites list.
 * @param {string} favoriteUserId - The ID of the user to favorite.
 */
export const addFavorite = async (favoriteUserId) => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);

  // Create or update favorites list
  await setDoc(
    userFavoritesRef,
    { favorites: arrayUnion(favoriteUserId) },
    { merge: true }
  );
};

/**
 * Removes a user from the current user's favorites list.
 * @param {string} favoriteUserId - The ID of the user to remove.
 */
export const removeFavorite = async (favoriteUserId) => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);

  await updateDoc(userFavoritesRef, {
    favorites: arrayRemove(favoriteUserId),
  });
};

/**
 * Gets the current user's favorites list.
 * @returns {Promise<string[]>} Array of user IDs favorited by current user.
 */
export const getFavorites = async () => {
  if (!auth.currentUser) throw new Error("User not authenticated");

  const userFavoritesRef = doc(db, "favorites", auth.currentUser.uid);
  const docSnap = await getDoc(userFavoritesRef);

  if (docSnap.exists()) {
    return docSnap.data().favorites || [];
  }
  return [];
};

/**
 * Checks if two users have favorited each other (mutual favorite).
 * @param {string} userId1
 * @param {string} userId2
 * @returns {Promise<boolean>} True if mutual favorite, false otherwise.
 */
export const checkMutualFavorite = async (userId1, userId2) => {
  const user1FavoritesRef = doc(db, "favorites", userId1);
  const user2FavoritesRef = doc(db, "favorites", userId2);

  const [doc1, doc2] = await Promise.all([getDoc(user1FavoritesRef), getDoc(user2FavoritesRef)]);

  if (doc1.exists() && doc2.exists()) {
    const user1Favs = doc1.data().favorites || [];
    const user2Favs = doc2.data().favorites || [];
    return user1Favs.includes(userId2) && user2Favs.includes(userId1);
  }

  return false;
};
