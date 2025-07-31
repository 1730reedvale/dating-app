// src/onboarding/OnboardingStep10.js

import React from "react";

const OnboardingStep10 = ({ profile, handleChange, nextStep, prevStep }) => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Step 10: Final Touches</h2>
      <p>Tell us a bit more to help personalize your experience.</p>

      <label>
        What’s your favorite way to spend a weekend?
        <textarea
          value={profile.weekendActivities || ""}
          onChange={(e) => handleChange("weekendActivities", e.target.value)}
          placeholder="Describe your ideal weekend"
          style={{ width: "100%", minHeight: 80, padding: 8, marginTop: 8, marginBottom: 16 }}
        />
      </label>

      <label>
        What’s something unique about you?
        <textarea
          value={profile.uniqueTrait || ""}
          onChange={(e) => handleChange("uniqueTrait", e.target.value)}
          placeholder="Share a fun fact or something special"
          style={{ width: "100%", minHeight: 80, padding: 8, marginTop: 8, marginBottom: 16 }}
        />
      </label>

      <label>
        What’s the one thing you’re looking for most in a partner?
        <textarea
          value={profile.topPartnerTrait || ""}
          onChange={(e) => handleChange("topPartnerTrait", e.target.value)}
          placeholder="Be honest and direct"
          style={{ width: "100%", minHeight: 80, padding: 8, marginTop: 8, marginBottom: 16 }}
        />
      </label>

      <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevStep} style={{ padding: "10px 20px" }}>
          ← Back
        </button>
        <button onClick={nextStep} style={{ padding: "10px 20px" }}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep10;
