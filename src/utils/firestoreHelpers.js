import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Mark the conversation as read now for this user
export async function markConversationRead(conversationId, userId) {
  const ref = doc(db, 'conversations', conversationId, 'metadata', userId);
  await setDoc(ref, { lastRead: serverTimestamp() }, { merge: true });
}

// Get the lastRead timestamp for a specific user in a conversation
export async function getLastRead(conversationId, userId) {
  const ref = doc(db, 'conversations', conversationId, 'metadata', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().lastRead?.toMillis?.() || 0 : 0;
}
