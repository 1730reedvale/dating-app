// src/dateRatings/DateRatingForm.js

import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const DateRatingForm = ({ dateId, onRatingSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating <= 0 || rating > 5) {
      setError("Please provide a rating between 1 and 5.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "dateRatings"), {
        dateId,
        userId: auth.currentUser.uid,
        rating,
        comments,
        createdAt: serverTimestamp(),
      });
      setRating(0);
      setComments("");
      if (onRatingSubmitted) onRatingSubmitted();
    } catch (err) {
      setError("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "20px auto" }}>
      <h3>Rate Your Date</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Rating (1-5):
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          required
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>
      <label>
        Comments:
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>
      <button type="submit" disabled={submitting} style={{ padding: 12, width: "100%" }}>
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
};

export default DateRatingForm;
