// /src/ratings/sendInvite.js
// Creates invitation documents in Firestore and returns their IDs/links.

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/** Generate a stable inviteId (uses crypto if available). */
export function makeInviteId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

/** Build the public rating link for a given inviteId. Adjust path if your route differs. */
export function buildInviteLink(inviteId) {
  const base = (typeof window !== 'undefined' && window.location?.origin) || '';
  return `${base}/rate?inviteId=${encodeURIComponent(inviteId)}`;
}

/**
 * Create a single invite.
 * @param {Object} params
 * @param {string|null} params.senderUid - UID of the user sending the invite (nullable).
 * @param {string} params.contactName   - Recipient display name.
 * @param {'email'|'sms'} params.method - Delivery method.
 * @param {string} params.recipient     - Email or phone number (raw string).
 * @returns {Promise<{inviteId:string, inviteLink:string}>}
 */
export async function createInvite({ senderUid = null, contactName, method = 'email', recipient }) {
  if (!contactName || !recipient) {
    throw new Error('Missing contactName or recipient');
  }
  const inviteId = makeInviteId();
  const inviteLink = buildInviteLink(inviteId);

  const doc = {
    inviteId,
    senderUid,
    contactName: String(contactName).trim(),
    method,
    recipient: String(recipient).trim(),
    status: 'pending',               // to be updated by your delivery job (email/SMS)
    inviteLink,
    createdAt: serverTimestamp(),
  };

  await addDoc(collection(db, 'invitations'), doc);
  return { inviteId, inviteLink };
}

/**
 * Optional helper: create many invites at once.
 * @param {Array<{contactName:string, method:'email'|'sms', recipient:string}>} rows
 * @param {string|null} senderUid
 * @returns {Promise<Array<{inviteId:string, inviteLink:string}>>}
 */
export async function createInvitesBatch(rows, senderUid = null) {
  const results = await Promise.all(
    rows.map(r =>
      createInvite({
        senderUid,
        contactName: r.contactName ?? r.name ?? '',
        method: r.method ?? 'email',
        recipient: r.recipient ?? r.address ?? '',
      })
    )
  );
  return results;
}
