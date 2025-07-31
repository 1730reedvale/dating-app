// src/onboarding/OnboardingStep7.js

import React, { useState } from "react";

const OnboardingStep7 = ({ profile, onChange, onNext, onBack }) => {
  const [languagesSpoken, setLanguagesSpoken] = useState(profile.languagesSpoken || []);

  const languagesOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Russian",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Other",
  ];

  const toggleLanguage = (language) => {
    if (languagesSpoken.includes(language)) {
      setLanguagesSpoken(languagesSpoken.filter((lang) => lang !== language));
    } else {
      setLanguagesSpoken([...languagesSpoken, language]);
    }
  };

  const handleNext = () => {
    onChange({ ...profile, languagesSpoken });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Languages Spoken</h2>
      <p>Select the languages you speak.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {languagesOptions.map((language) => (
          <label key={language} style={{ flex: "0 0 45%", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={languagesSpoken.includes(language)}
              onChange={() => toggleLanguage(language)}
            />{" "}
            {language}
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

export default OnboardingStep7;
