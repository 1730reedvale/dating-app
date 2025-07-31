// src/onboarding/OnboardingStep1.js

import React, { useState } from "react";

const OnboardingStep1 = ({ profile, onChange, onNext }) => {
  const [displayName, setDisplayName] = useState(profile.displayName || "");
  const [email, setEmail] = useState(profile.email || "");

  const handleNext = () => {
    onChange({ ...profile, displayName, email });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Welcome! Let's get started</h2>
      <p>Please tell us your name and email.</p>
      <label>
        Display Name:
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          placeholder="Your display name"
        />
      </label>
      <label style={{ marginTop: 12 }}>
        Email Address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
          placeholder="Your email address"
        />
      </label>
      <button
        onClick={handleNext}
        style={{
          marginTop: 20,
          padding: 12,
          width: "100%",
          backgroundColor: "#3cb371",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
        disabled={!displayName || !email}
      >
        Next
      </button>
    </div>
  );
};

export default OnboardingStep1;
