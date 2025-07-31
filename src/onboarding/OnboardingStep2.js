// src/onboarding/OnboardingStep2.js

import React, { useState } from "react";

const OnboardingStep2 = ({ profile, onChange, onNext, onBack }) => {
  const [age, setAge] = useState(profile.age || "");
  const [gender, setGender] = useState(profile.gender || "");

  const handleNext = () => {
    onChange({ ...profile, age, gender });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Tell us about yourself</h2>
      <p>What is your age and gender?</p>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          placeholder="Your age"
          min={18}
          max={100}
        />
      </label>
      <label style={{ marginTop: 12 }}>
        Gender:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
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
          disabled={!age || !gender}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
