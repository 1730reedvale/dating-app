// /src/firebase/invitations.js
import { db } from './firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export const sendRatingInvite = async (fromUserId, contactName, contactMethod) => {
  try {
    const inviteId = uuidv4();

    const inviteRef = await addDoc(collection(db, 'invites'), {
      inviteId,
      fromUserId,
      contactName,
      contactMethod,
      responded: false,
      sentAt: serverTimestamp(),
    });

    return `/rate/${inviteRef.id}`;
  } catch (error) {
    console.error('Error creating rating invite:', error);
    return null;
  }
};
