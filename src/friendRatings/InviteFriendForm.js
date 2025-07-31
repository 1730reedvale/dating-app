

import React, { useState } from "react";
import { sendFriendInvite } from "./InviteService";

const InviteFriendForm = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setSending(true);
    setMessage("");
    setInviteLink("");
    try {
      const token = await sendFriendInvite(userId, email);
      // Example invite URL (adjust domain and route as needed)
      const url = `${window.location.origin}/friend-invite/${token}`;
      setInviteLink(url);
      setMessage(`Invite sent to ${email}! Share this link with them:`);
      setEmail("");
    } catch {
      setMessage("Failed to send invite. Please try again.");
    }
    setSending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: 16, color: "#1a237e" }}>Invite a Friend</h2>
      <p style={{ marginBottom: 24, color: "#555" }}>
        Enter your friend’s email to invite them to rate you. They’ll receive a
        quick form to share their feedback.
      </p>
      <label style={{ display: "block", marginBottom: 8 }}>
        Friend’s Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          placeholder="friend@example.com"
          required
          style={{
            width: "100%",
            padding: 10,
            marginTop: 4,
            marginBottom: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
            boxSizing: "border-box",
          }}
        />
      </label>

      {message && (
        <p
          style={{
            color: message.includes("sent") ? "green" : "red",
            marginBottom: 16,
          }}
        >
          {message}
        </p>
      )}

      {inviteLink && (
        <div
          style={{
            backgroundColor: "#e8eaf6",
            padding: 12,
            borderRadius: 6,
            marginBottom: 16,
            wordBreak: "break-all",
          }}
        >
          <strong>Invite Link:</strong>
          <br />
          <a href={inviteLink} target="_blank" rel="noreferrer">
            {inviteLink}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        style={{
          width: "100%",
          padding: 14,
          backgroundColor: "#1a237e",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
          border: "none",
          borderRadius: 6,
          cursor: sending ? "not-allowed" : "pointer",
          boxShadow: "0 2px 6px rgba(26, 35, 126, 0.4)",
        }}
      >
        {sending ? "Sending..." : "Send Invite"}
      </button>
    </form>
  );
};

export default InviteFriendForm;
