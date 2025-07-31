
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const DateStorySharing = ({ userId }) => {
  const [story, setStory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!story.trim()) {
      setError("Please enter a story.");
      return;
    }
    try {
      await addDoc(collection(db, "dateStories"), {
        userId,
        story,
        createdAt: Timestamp.now(),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit story. Please try again.");
    }
  };

  if (submitted) return <p>Thank you for sharing your story!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Share your date story:
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
          cols={50}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Story</button>
    </form>
  );
};

export default DateStorySharing;
