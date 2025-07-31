// src/notifications/NotificationsService.js

import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

/**
 * Adds a notification for a given user.
 * @param {string} userId - The ID of the user to notify.
 * @param {object} notification - The notification data.
 */
export const addNotification = async (userId, notification) => {
  try {
    const notificationsRef = collection(db, "notifications");
    await addDoc(notificationsRef, {
      userId,
      ...notification,
      createdAt: new Date(),
      read: false,
    });
  } catch (error) {
    console.error("Error adding notification:", error);
  }
};

/**
 * Retrieves unread notifications for the current user.
 * @param {function} callback - Function to call on data update.
 * @returns Unsubscribe function to stop listening.
 */
export const subscribeToNotifications = (callback) => {
  if (!auth.currentUser) {
    console.warn("No authenticated user for notifications subscription");
    return () => {};
  }
  const notificationsRef = collection(db, "notifications");
  const q = query(
    notificationsRef,
    where("userId", "==", auth.currentUser.uid),
    where("read", "==", false)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notifications = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    callback(notifications);
  });

  return unsubscribe;
};

/**
 * Marks a notification as read by deleting it.
 * @param {string} notificationId - The ID of the notification to delete.
 */
export const markNotificationRead = async (notificationId) => {
  try {
    const notificationDoc = doc(db, "notifications", notificationId);
    await deleteDoc(notificationDoc);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};
