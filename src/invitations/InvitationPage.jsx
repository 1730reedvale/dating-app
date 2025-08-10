import React, { useMemo, useState } from 'react';
import './InvitationPage.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../auth/AuthContext';

const newRow = () => ({
  id:
    (globalThis.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`,
  name: '',
  method: 'email', // 'email' | 'sms'
  address: ''
});

const validators = {
  email: v => /\S+@\S+\.\S+/.test(v),
  sms: v => /^[0-9\-\+\(\)\s]{7,}$/.test(v)
};

export default function InvitationPage() {
  const [rows, setRows] = useState([newRow()]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successCount, setSuccessCount] = useState(0);
  const { currentUser } = (typeof useAuth === 'function' ? useAuth() : { currentUser: null });

  const contactsSupported = typeof navigator !== 'undefined'
    && !!navigator.contacts
    && typeof navigator.contacts.select === 'function';

  const allValid = useMemo(() => {
    if (rows.length === 0) return false;
    return rows.every(r => {
      if (!r.name?.trim()) return false;
      if (!r.address?.trim()) return false;
      const validate = validators[r.method] || (() => true);
      return validate(r.address.trim());
    });
  }, [rows]);

  const updateRow = (id, patch) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => setRows(prev => [...prev, newRow()]);
  const removeRow = id => setRows(prev => prev.filter(r => r.id !== id));

  const inviteLinkFor = inviteId =>
    `${window.location.origin}/rate?inviteId=${encodeURIComponent(inviteId)}`;

  // Always visible button; gracefully handle unsupported browsers
  const pickContacts = async () => {
    try {
      setError('');
      if (!contactsSupported) {
        setError('Import from device contacts is only available on mobile browsers (iOS Safari 16+ or Chrome/Android) over HTTPS/localhost.');
        return;
      }
      const props = ['name', 'email', 'tel'];
      const opts = { multiple: true };
      const selected = await navigator.contacts.select(props, opts);
      if (!selected || selected.length === 0) return;

      const mapped = selected
        .map(c => {
          const name = Array.isArray(c.name) ? c.name[0] : (c.name || '');
          const emails = (c.email || []).filter(Boolean);
          const tels = (c.tel || []).filter(Boolean);

          let method = 'email';
          let address = emails[0] || '';
          if (!address && tels.length) {
            method = 'sms';
            address = tels[0];
          }
          if (!address) return null;

          return {
            id:
              (globalThis.crypto && crypto.randomUUID)
                ? crypto.randomUUID()
                : `id_${Date.now()}_${Math.random().toString(16).slice(2)}`,
            name: String(name || '').trim(),
            method,
            address: String(address || '').trim()
          };
        })
        .filter(Boolean);

      if (mapped.length === 0) {
        setError('None of the selected contacts had an email or phone number.');
        return;
      }

      const seen = new Set();
      const deduped = mapped.filter(m => {
        const key = `${m.method}:${m.address.toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setRows(prev => [...prev, ...deduped]);
    } catch (err) {
      console.error(err);
      setError('Could not open device contacts. Try on your phone with iOS Safari 16+ or Chrome/Android.');
    }
  };

  const sendInvites = async () => {
    setError('');
    setSuccessCount(0);

    if (!allValid) {
      setError('Please complete all fields with valid information.');
      return;
    }

    try {
      setSending(true);

      const writes = rows.map(async r => {
        const inviteId = r.id;
        await addDoc(collection(db, 'invitations'), {
          inviteId,
          senderUid: currentUser?.uid || null,
          contactName: r.name.trim(),
          method: r.method,
          recipient: r.address.trim(),
          status: 'pending',
          inviteLink: inviteLinkFor(inviteId),
          createdAt: serverTimestamp()
        });
      });

      await Promise.all(writes);
      setSuccessCount(rows.length);
      setRows([newRow()]);
    } catch (e) {
      console.error(e);
      setError('Couldn’t send invites. Check Firebase config/permissions and try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="invite-screen">
      <div className="invite-wrapper">
        <div className="invite-card">
          <div className="invite-header">
            <div>
              <h1 className="invite-title">Invite People to Rate You</h1>
              <p className="invite-subtitle">
                Add contacts and we’ll send each a secure, trackable link.
              </p>
            </div>

            <button
              type="button"
              className="send-btn"
              onClick={pickContacts}
              aria-label="Import from device contacts"
              title={contactsSupported ? 'Import from Contacts' : 'Works on iPhone Safari 16+ or Chrome/Android'}
            >
              Import from Contacts
            </button>
          </div>

          <div className="invite-rows">
            {rows.map(r => (
              <div key={r.id} className="invite-row">
                <div className="field name">
                  <label className="label">Contact Name</label>
                  <input
                    className="input"
                    placeholder="Alex Johnson"
                    value={r.name}
                    onChange={e => updateRow(r.id, { name: e.target.value })}
                  />
                </div>

                <div className="field method">
                  <label className="label">Method</label>
                  <select
                    className="select"
                    value={r.method}
                    onChange={e =>
                      updateRow(r.id, { method: e.target.value, address: '' })
                    }
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>

                <div className="field address">
                  <label className="label">
                    {r.method === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <input
                    className="input"
                    placeholder={r.method === 'email' ? 'name@example.com' : '(555) 123‑4567'}
                    value={r.address}
                    onChange={e => updateRow(r.id, { address: e.target.value })}
                  />
                  {!!r.address &&
                    !(validators[r.method] || (() => true))(r.address.trim()) && (
                      <div className="helper">
                        Please enter a valid {r.method === 'email' ? 'email' : 'phone'}.
                      </div>
                    )}
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeRow(r.id)}
                    aria-label="Remove invite"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && <div className="error">{error}</div>}

          <div className="invite-footer">
            <button type="button" className="add-btn" onClick={addRow} disabled={sending}>
              + Add Another
            </button>
            <button
              type="button"
              className="send-btn"
              onClick={sendInvites}
              disabled={sending || !allValid}
            >
              {sending ? 'Sending…' : 'Send Invites'}
            </button>
          </div>

          {successCount > 0 && (
            <div className="helper" style={{ marginTop: 10 }}>
              Sent {successCount} invite{successCount > 1 ? 's' : ''}. You can add more anytime.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
