// /src/ratings/RatingReceivedPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./RatingReceivedPage.css";

const RatingReceivedPage = () => {
  const { inviteId } = useParams();
  const [status, setStatus] = useState("loading");
  const [ratingDetails, setRatingDetails] = useState(null);

  useEffect(() => {
    const markInviteAsResponded = async () => {
      try {
        if (!inviteId) {
          setStatus("error");
          return;
        }

        const inviteRef = doc(db, "ratingInvites", inviteId);
        const inviteSnap = await getDoc(inviteRef);

        if (!inviteSnap.exists()) {
          setStatus("error");
          return;
        }

        const inviteData = inviteSnap.data();
        setRatingDetails(inviteData);

        // Mark invite as responded if not already
        if (!inviteData.responded) {
          await updateDoc(inviteRef, {
            responded: true,
            respondedAt: new Date(),
          });
        }

        setStatus("success");
      } catch (err) {
        console.error("Error marking invite as responded:", err);
        setStatus("error");
      }
    };

    markInviteAsResponded();
  }, [inviteId]);

  return (
    <div className="page-container">
      <div className="orange-line"></div>
      <div className="rating-received-page">
        {status === "loading" && <p>Loading rating details...</p>}
        {status === "error" && (
          <div className="rating-card error">
            <p>Sorry, this rating link is invalid or expired.</p>
          </div>
        )}
        {status === "success" && ratingDetails && (
          <div className="rating-card">
            <h2>Thank You for Your Rating!</h2>
            <p>
              Your feedback for <strong>{ratingDetails.userName}</strong> has
              been received.
            </p>
            <p>We appreciate your input!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingReceivedPage;
