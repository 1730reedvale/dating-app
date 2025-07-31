// src/onboarding/OnboardingStep6.js

import React, { useState } from "react";

const OnboardingStep6 = ({ profile, onChange, onNext, onBack }) => {
  const [pets, setPets] = useState(profile.pets || "");

  const handleNext = () => {
    onChange({ ...profile, pets });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Pets</h2>
      <p>Do you have pets or like animals? Let others know!</p>

      <label>
        Pets:
        <select
          value={pets}
          onChange={(e) => setPets(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select...</option>
          <option value="No pets">No pets</option>
          <option value="Dog owner">Dog owner</option>
          <option value="Cat owner">Cat owner</option>
          <option value="Other pets">Other pets</option>
          <option value="Animal lover">Animal lover (no pets)</option>
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
          disabled={!pets}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep6;
