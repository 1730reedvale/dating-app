import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FriendRatingForm = ({ friendId }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating < 1 || rating > 5) {
      setError("Please provide a rating between 1 and 5.");
      return;
    }

    try {
      await addDoc(collection(db, "friendRatings"), {
        raterId: auth.currentUser.uid,
        friendId,
        rating,
        comments,
        createdAt: serverTimestamp(),
      });
      setSuccess("Rating submitted successfully!");
      setRating(0);
      setComments("");
    } catch (err) {
      setError("Failed to submit rating. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "20px auto" }}>
      <h3>Rate Your Friend</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <label>
        Rating (1 to 5):
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          required
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>
      <label style={{ marginTop: 12 }}>
        Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </label>
      <button type="submit" style={{ marginTop: 20, padding: 12, width: "100%" }}>
        Submit Rating
      </button>
    </form>
  );
};

export default FriendRatingForm;
