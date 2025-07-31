// src/onboarding/OnboardingStep9.js

import React from "react";

const OnboardingStep9 = ({ profile, handleChange, nextStep, prevStep }) => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Step 9: Personality and Values</h2>
      <p>Help us understand what traits are important to you in a partner.</p>

      <label>
        How important is kindness to you?
        <select
          value={profile.kindnessImportance || ""}
          onChange={(e) => handleChange("kindnessImportance", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
        >
          <option value="">Select one</option>
          <option value="Not important">Not important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Very important">Very important</option>
          <option value="Essential">Essential</option>
        </select>
      </label>

      <label>
        How important is reliability?
        <select
          value={profile.reliabilityImportance || ""}
          onChange={(e) => handleChange("reliabilityImportance", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
        >
          <option value="">Select one</option>
          <option value="Not important">Not important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Very important">Very important</option>
          <option value="Essential">Essential</option>
        </select>
      </label>

      <label>
        How important is a good sense of humor?
        <select
          value={profile.humorImportance || ""}
          onChange={(e) => handleChange("humorImportance", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
        >
          <option value="">Select one</option>
          <option value="Not important">Not important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Very important">Very important</option>
          <option value="Essential">Essential</option>
        </select>
      </label>

      <label>
        How important is empathy?
        <select
          value={profile.empathyImportance || ""}
          onChange={(e) => handleChange("empathyImportance", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
        >
          <option value="">Select one</option>
          <option value="Not important">Not important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Very important">Very important</option>
          <option value="Essential">Essential</option>
        </select>
      </label>

      <label>
        How important is problem solving (or “handling challenges”)?
        <select
          value={profile.problemSolvingImportance || ""}
          onChange={(e) => handleChange("problemSolvingImportance", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 8, marginBottom: 16 }}
        >
          <option value="">Select one</option>
          <option value="Not important">Not important</option>
          <option value="Somewhat important">Somewhat important</option>
          <option value="Very important">Very important</option>
          <option value="Essential">Essential</option>
        </select>
      </label>

      <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevStep} style={{ padding: "10px 20px" }}>
          ← Back
        </button>
        <button onClick={nextStep} style={{ padding: "10px 20px" }}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep9;
