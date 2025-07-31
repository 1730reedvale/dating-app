// src/onboarding/OnboardingStep4.js

import React, { useState } from "react";

const OnboardingStep4 = ({ profile, onChange, onNext, onBack }) => {
  const [relationshipType, setRelationshipType] = useState(profile.relationshipType || "");
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel || "");

  const handleNext = () => {
    onChange({ ...profile, relationshipType, educationLevel });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Relationship Preferences & Education</h2>
      <p>Tell us about the kind of relationship you’re looking for and your education level.</p>

      <label>
        Relationship Type Sought:
        <select
          value={relationshipType}
          onChange={(e) => setRelationshipType(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select...</option>
          <option value="Casual">Casual</option>
          <option value="Serious">Serious</option>
          <option value="Marriage">Marriage</option>
          <option value="Friendship">Friendship</option>
          <option value="Open">Open</option>
        </select>
      </label>

      <label style={{ marginTop: 12 }}>
        Education Level:
        <select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select...</option>
          <option value="High School">High School</option>
          <option value="Associate Degree">Associate Degree</option>
          <option value="Bachelor’s Degree">Bachelor’s Degree</option>
          <option value="Master’s Degree">Master’s Degree</option>
          <option value="Doctorate">Doctorate</option>
          <option value="Other">Other</option>
        </select>
      </label>

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
          disabled={!relationshipType || !educationLevel}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep4;
