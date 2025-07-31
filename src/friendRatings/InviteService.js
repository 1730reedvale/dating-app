// src/friendRatings/InviteService.js

import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

/**
 * Get pending friend invites for a given user.
 * @param {string} userId
 * @returns {Promise<Array>} List of pending invites
 */
export const getPendingInvites = async (userId) => {
  // Implement your logic here, e.g. fetch from Firestore collection
  // Example placeholder:
  // const invitesSnapshot = await getDocs(collection(db, "invites"));
  // return invitesSnapshot.docs.map(doc => doc.data());
  return []; // Replace with actual implementation
};

/**
 * Send a friend invite from one user to another.
 * @param {string} fromUserId
 * @param {string} toUserId
 * @returns {Promise<void>}
 */
export const sendFriendInvite = async (fromUserId, toUserId) => {
  // Implement sending invite logic here
  // Example placeholder:
  // const inviteRef = doc(collection(db, "invites"));
  // await setDoc(inviteRef, { fromUserId, toUserId, status: "pending" });
};

/**
 * Accept a friend invite.
 * Adds the inviteId to the user's acceptedInvites array.
 * Adjust this according to your Firestore schema.
 * 
 * @param {string} userId - The ID of the user accepting the invite
 * @param {string} inviteId - The ID of the invite to accept
 * @returns {Promise<void>}
 */
export const acceptInvite = async (userId, inviteId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      acceptedInvites: arrayUnion(inviteId),
    });
  } catch (error) {
    console.error("Error accepting invite:", error);
    throw error;
  }
};
