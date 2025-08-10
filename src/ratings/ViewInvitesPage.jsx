// File: /src/ratings/ViewInvitesPage.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import "./ViewInvitesPage.css";

const ViewInvitesPage = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const invitesRef = collection(db, "users", auth.currentUser.uid, "invites");
        const snapshot = await getDocs(invitesRef);
        const invitesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setInvites(invitesList);
      } catch (error) {
        console.error("Error fetching invites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  return (
    <div className="view-invites-page">
      <Navbar />
      <div className="view-invites-container">
        <h1>My Rating Invites</h1>
        {loading ? (
          <p>Loading invites...</p>
        ) : invites.length === 0 ? (
          <p>You haven’t sent any invites yet.</p>
        ) : (
          <table className="invites-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invites.map(invite => (
                <tr key={invite.id}>
                  <td>{invite.contactName || "Unknown"}</td>
                  <td className={invite.responded ? "status-responded" : "status-pending"}>
                    {invite.responded ? "Responded" : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewInvitesPage;
