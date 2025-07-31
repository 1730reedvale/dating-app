// src/onboarding/OnboardingStep3.js

import React, { useState } from "react";

const OnboardingStep3 = ({ profile, onChange, onNext, onBack }) => {
  const [relationshipGoals, setRelationshipGoals] = useState(profile.relationshipGoals || []);

  const options = [
    "Friendship",
    "Casual Dating",
    "Long-term Relationship",
    "Marriage",
    "Networking",
    "Other",
  ];

  const toggleOption = (option) => {
    if (relationshipGoals.includes(option)) {
      setRelationshipGoals(relationshipGoals.filter((goal) => goal !== option));
    } else {
      setRelationshipGoals([...relationshipGoals, option]);
    }
  };

  const handleNext = () => {
    onChange({ ...profile, relationshipGoals });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>What are you looking for?</h2>
      <p>Select all that apply:</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options.map((option) => (
          <label key={option} style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              checked={relationshipGoals.includes(option)}
              onChange={() => toggleOption(option)}
              style={{ marginRight: 8 }}
            />
            {option}
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
          disabled={relationshipGoals.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
