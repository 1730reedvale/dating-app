// /src/invitations/SendInvitesPage.jsx
import React, { useState } from 'react';
import './SendInvitesPage.css';
import { createInvite } from '../ratings/sendInvite';
import { useAuth } from '../auth/AuthContext';

const SendInvitesPage = () => {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([
    { name: '', method: 'email', info: '' },
  ]);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const next = [...contacts];
    next[index][field] = value;
    setContacts(next);
  };

  const addRow = () => {
    setContacts([...contacts, { name: '', method: 'email', info: '' }]);
  };

  const removeRow = (idx) => {
    const next = contacts.filter((_, i) => i !== idx);
    setContacts(next.length ? next : [{ name: '', method: 'email', info: '' }]);
  };

  const sendInvites = async () => {
    if (!currentUser?.uid) return;
    setSending(true);
    const sent = [];

    for (const c of contacts) {
      const contactName = c.name?.trim();
      const contactInfo = c.info?.trim();
      const method = c.method;

      if (!contactName || !contactInfo) continue;

      try {
        const { inviteId, inviteLink } = await createInvite({
          fromUserId: currentUser.uid,
          contactName,
          contactInfo,
          method,
        });
        sent.push({ inviteId, contactName, inviteLink, method });
      } catch (e) {
        // If one fails, continue with others
        sent.push({ error: true, contactName, method });
      }
    }

    setResults(sent);
    setSending(false);
  };

  return (
    <div className="invite-page">
      <h2>Invite People to Rate You</h2>
      <p>Enter names and how to reach them. We’ll generate a unique link for each invite.</p>

      {contacts.map((c, i) => (
        <div key={i} className="contact-form">
          <input
            type="text"
            placeholder="Contact Name"
            value={c.name}
            onChange={(e) => handleChange(i, 'name', e.target.value)}
          />
          <select
            value={c.method}
            onChange={(e) => handleChange(i, 'method', e.target.value)}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
          <input
            type="text"
            placeholder={c.method === 'sms' ? 'Phone Number' : 'Email Address'}
            value={c.info}
            onChange={(e) => handleChange(i, 'info', e.target.value)}
          />
          <button type="button" onClick={() => removeRow(i)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={addRow}>
        + Add Another
      </button>

      <button type="button" onClick={sendInvites} disabled={sending}>
        {sending ? 'Sending…' : 'Send Invites'}
      </button>

      {results.length > 0 && (
        <div className="invite-results">
          <h3>Results</h3>
          <ul>
            {results.map((r, idx) => (
              <li key={idx}>
                {r.error ? (
                  <span>❌ Failed to create invite for {r.contactName}</span>
                ) : (
                  <>
                    ✅ {r.contactName} — ({r.method}) —{' '}
                    <a href={r.inviteLink}>{r.inviteLink}</a>
                  </>
                )}
              </li>
            ))}
          </ul>
          <p>
            You can copy these links into your email/SMS tool now. (Automated sending can
            be wired up later.)
          </p>
        </div>
      )}
    </div>
  );
};

export default SendInvitesPage;
