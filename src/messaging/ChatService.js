// src/messaging/ChatService.js

import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../firebase";

// Generate a consistent conversation ID for two user IDs
function getConversationId(userId1, userId2) {
  return userId1 < userId2
    ? `${userId1}_${userId2}`
    : `${userId2}_${userId1}`;
}

// Send a message in a conversation between current user and otherUserId
export async function sendMessage(otherUserId, text) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const conversationId = getConversationId(currentUser.uid, otherUserId);

  const messagesRef = collection(db, "conversations", conversationId, "messages");
  const conversationDocRef = doc(db, "conversations", conversationId);

  // Add message document
  await addDoc(messagesRef, {
    senderId: currentUser.uid,
    text,
    timestamp: serverTimestamp(),
  });

  // Update conversation meta info
  await updateDoc(conversationDocRef, {
    lastMessage: text,
    lastMessageTimestamp: serverTimestamp(),
    participants: [currentUser.uid, otherUserId],
  });
}

// Subscribe to conversation messages in real-time
export function subscribeToMessages(otherUserId, callback) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const conversationId = getConversationId(currentUser.uid, otherUserId);
  const messagesRef = collection(db, "conversations", conversationId, "messages");

  const q = query(messagesRef, orderBy("timestamp"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });

  return unsubscribe;
}

// Subscribe to conversation list for the current user
export function subscribeToConversations(callback) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated");

  const conversationsRef = collection(db, "conversations");
  const q = query(
    conversationsRef,
    where("participants", "array-contains", currentUser.uid),
    orderBy("lastMessageTimestamp", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const conversations = [];
    snapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() });
    });
    callback(conversations);
  });

  return unsubscribe;
}
