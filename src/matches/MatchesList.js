// src/matches/MatchesList.js

import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      if (!auth.currentUser) return;

      setLoading(true);

      try {
        const matchesRef = collection(db, "matches");
        const q = query(matchesRef, where("userIds", "array-contains", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        const matchesData = [];
        querySnapshot.forEach(doc => {
          matchesData.push({ id: doc.id, ...doc.data() });
        });

        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;

  if (matches.length === 0) return <p>No matches found.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>Your Matches</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {matches.map(match => (
          <li
            key={match.id}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #ccc",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/profile/${match.matchedUserId}`)}
          >
            <strong>{match.matchedUserName || "Unknown"}</strong>
            <div>{match.latestMessage || "No messages yet."}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesList;
