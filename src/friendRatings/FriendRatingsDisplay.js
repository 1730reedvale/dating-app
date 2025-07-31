// src/friendRatings/FriendRatingsDisplay.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

const FriendRatingsDisplay = ({ friendId }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!friendId) {
      setRatings([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "friendRatings"),
      where("friendId", "==", friendId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedRatings = [];
        querySnapshot.forEach((doc) => {
          fetchedRatings.push({ id: doc.id, ...doc.data() });
        });
        setRatings(fetchedRatings);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching friend ratings: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [friendId]);

  if (loading) return <p>Loading friend ratings...</p>;

  if (ratings.length === 0) return <p>No ratings available for this friend.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h3>Friend Ratings</h3>
      {ratings.map(({ id, userId, rating, comments, createdAt }) => (
        <div key={id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <strong>Rating: </strong> {rating} / 5<br />
          <strong>Comments: </strong> {comments || "-"}<br />
          <small>
            {createdAt?.toDate
              ? createdAt.toDate().toLocaleString()
              : "Date not available"}
          </small>
        </div>
      ))}
    </div>
  );
};

export default FriendRatingsDisplay;
