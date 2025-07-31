// src/safety/ShadowbanService.js

import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const isUserShadowbanned = async (userId) => {
  const docRef = doc(db, "shadowbans", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().isBanned : false;
};

export const setShadowbanStatus = async (userId, isBanned) => {
  const docRef = doc(db, "shadowbans", userId);
  if ((await getDoc(docRef)).exists()) {
    await updateDoc(docRef, { isBanned });
  } else {
    await setDoc(docRef, { isBanned });
  }
};

export const checkAndApplyShadowban = async (userId) => {
  const banned = await isUserShadowbanned(userId);
  if (banned) {
    // Implement shadowban logic, e.g., restrict features or notify user
    return true;
  }
  return false;
};
