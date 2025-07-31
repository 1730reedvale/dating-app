// /src/invitations/InvitationsPage.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import "./InvitationsPage.css";

function InvitationsPage() {
  const { currentUser } = useAuth();
  const [sentInvites, setSentInvites] = useState([]);
  const [receivedInvites, setReceivedInvites] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const invitesRef = collection(db, "invitations");

        const sentQuery = query(invitesRef, where("from", "==", currentUser.uid));
        const receivedQuery = query(invitesRef, where("to", "==", currentUser.uid));

        const [sentSnap, receivedSnap] = await Promise.all([
          getDocs(sentQuery),
          getDocs(receivedQuery),
        ]);

        const sent = sentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const received = receivedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setSentInvites(sent);
        setReceivedInvites(received);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };

    if (currentUser?.uid) {
      fetchInvitations();
    }
  }, [currentUser]);

  return (
    <div className="invitations-page">
      <h2>Received Invitations</h2>
      <div className="invitation-list">
        {receivedInvites.map((invite) => (
          <div key={invite.id} className="invitation-card">
            <h4>From: {invite.fromName || invite.from}</h4>
            <p>Status: <span className="status">{invite.status || "Pending"}</span></p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Sent Invitations</h2>
      <div className="invitation-list">
        {sentInvites.map((invite) => (
          <div key={invite.id} className="invitation-card">
            <h4>To: {invite.toName || invite.to}</h4>
            <p>Status: <span className="status">{invite.status || "Pending"}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvitationsPage;
