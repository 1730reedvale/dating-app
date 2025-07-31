// src/onboarding/OnboardingStep8.js

import React, { useState } from "react";

const OnboardingStep8 = ({ profile, onChange, onNext, onBack }) => {
  const [hobbies, setHobbies] = useState(profile.hobbies || []);

  // Expanded hobby options with categories and many items
  const hobbyOptions = [
    "Traveling",
    "Hiking",
    "Running",
    "Cycling",
    "Swimming",
    "Yoga",
    "Dancing",
    "Painting",
    "Drawing",
    "Photography",
    "Reading",
    "Writing",
    "Cooking",
    "Baking",
    "Gardening",
    "Music",
    "Playing Instruments",
    "Singing",
    "Watching Movies",
    "Board Games",
    "Video Games",
    "Camping",
    "Fishing",
    "Volunteering",
    "Collecting",
    "Meditation",
    "Crafting",
    "Knitting",
    "Bird Watching",
    "Martial Arts",
    "Fitness Training",
    "Skiing",
    "Snowboarding",
    "Surfing",
    "Scuba Diving",
    "Rock Climbing",
    "Pottery",
    "Theater",
    "Travel Blogging",
    "Language Learning",
    "Wine Tasting",
    "Golf",
    "Tennis",
    "Soccer",
    "Basketball",
    "Baseball",
    "Football",
    "Volleyball",
    "Badminton",
    "Archery",
    "Yoga",
    "Pilates",
    "Chess",
    "Puzzles",
    "Magic Tricks",
  ];

  const toggleHobby = (hobby) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  const handleNext = () => {
    onChange({ ...profile, hobbies });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Hobbies</h2>
      <p>Select your hobbies from the list below.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, maxHeight: 400, overflowY: "auto" }}>
        {hobbyOptions.map((hobby) => (
          <label key={hobby} style={{ flex: "0 0 45%", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={hobbies.includes(hobby)}
              onChange={() => toggleHobby(hobby)}
            />{" "}
            {hobby}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={onBack}
          style={{
            padding: 12,
            width: "48%",
            backgroundColor: "#aaa",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: 12,
            width: "48%",
            backgroundColor: "#3cb371",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep8;
