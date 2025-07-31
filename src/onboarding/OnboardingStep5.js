// src/onboarding/OnboardingStep5.js

import React, { useState } from "react";

const OnboardingStep5 = ({ profile, onChange, onNext, onBack }) => {
  const [smokingHabit, setSmokingHabit] = useState(profile.smokingHabit || "");
  const [drinkingHabit, setDrinkingHabit] = useState(profile.drinkingHabit || "");

  const handleNext = () => {
    onChange({ ...profile, smokingHabit, drinkingHabit });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Lifestyle Habits</h2>
      <p>Let us know about your smoking and drinking habits.</p>

      <label>
        Smoking Habit:
        <select
          value={smokingHabit}
          onChange={(e) => setSmokingHabit(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select...</option>
          <option value="Non-smoker">Non-smoker</option>
          <option value="Occasional smoker">Occasional smoker</option>
          <option value="Regular smoker">Regular smoker</option>
        </select>
      </label>

      <label style={{ marginTop: 12 }}>
        Drinking Habit:
        <select
          value={drinkingHabit}
          onChange={(e) => setDrinkingHabit(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        >
          <option value="">Select...</option>
          <option value="Non-drinker">Non-drinker</option>
          <option value="Occasional drinker">Occasional drinker</option>
          <option value="Regular drinker">Regular drinker</option>
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
          disabled={!smokingHabit || !drinkingHabit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep5;
