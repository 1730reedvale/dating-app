// src/notifications/NotificationsService.js

import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const notificationsCollection = collection(db, "notifications");

// Listen for notifications for a given user
export const listenForNotifications = (userId, callback) => {
  const q = query(notificationsCollection, where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    callback(notifications);
  });
};

// Send a new notification to a user
export const sendNotification = async (userId, type, data) => {
  await addDoc(notificationsCollection, {
    userId,
    type, // e.g., 'mutual_favorite', 'message_received'
    data, // any additional data relevant to notification
    read: false,
    createdAt: serverTimestamp(),
  });
};

// Mark a notification as read (delete or update)
export const markNotificationRead = async (notificationId) => {
  const notificationDoc = doc(db, "notifications", notificationId);
  await deleteDoc(notificationDoc);
  // Or alternatively, update the read flag instead of deleting:
  // await updateDoc(notificationDoc, { read: true });
};
