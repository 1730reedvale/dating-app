import React, { useEffect, useState } from "react";
import { getMutualMatches } from "./MutualMatchesService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const MutualMatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMutualMatches = async () => {
      setLoading(true);
      try {
        const mutualUserIds = await getMutualMatches();
        const usersData = await Promise.all(
          mutualUserIds.map(async (userId) => {
            const userDoc = await getDoc(doc(db, "users", userId));
            return userDoc.exists() ? { id: userId, ...userDoc.data() } : null;
          })
        );
        setMatches(usersData.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch mutual matches:", error);
      }
      setLoading(false);
    };

    fetchMutualMatches();
  }, []);

  if (loading) return <p>Loading mutual matches...</p>;
  if (matches.length === 0) return <p>No mutual matches found.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>Mutual Matches</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {matches.map((user) => (
          <li
            key={user.id}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
            }}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: 16,
                }}
              />
            ) : (
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                  marginRight: 16,
                }}
              />
            )}
            <div>
              <strong>{user.displayName || "Unnamed User"}</strong>
              <div style={{ fontSize: 12, color: "#555" }}>{user.bio || "No bio"}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MutualMatchesList;
