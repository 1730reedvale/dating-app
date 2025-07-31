// src/dateRatings/DateRatingsDisplay.js

import React from "react";

const DateRatingsDisplay = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return <p>No date ratings available.</p>;
  }

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <h3>Date Ratings</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {ratings.map((rating, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              backgroundColor: "#fafafa",
            }}
          >
            <div><strong>Rater:</strong> {rating.raterName || "Anonymous"}</div>
            <div><strong>Date:</strong> {new Date(rating.date).toLocaleDateString()}</div>
            <div><strong>Rating:</strong> {rating.score} / 5</div>
            <div><strong>Comments:</strong> {rating.comments || "-"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateRatingsDisplay;
