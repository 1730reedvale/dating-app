import React, { useState } from "react";

const OnboardingStep11 = ({ profile, onNext, onBack, onUpdate }) => {
  const [communicationStyle, setCommunicationStyle] = useState(profile.communicationStyle || "");

  const handleNext = () => {
    onUpdate({ communicationStyle });
    onNext();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Step 11: Communication Style</h2>
      <p>Please describe your preferred communication style in a relationship.</p>
      <textarea
        value={communicationStyle}
        onChange={(e) => setCommunicationStyle(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: 8, fontSize: 16 }}
        placeholder="E.g., open and honest, lots of texting, prefers phone calls..."
      />
      <div style={{ marginTop: 20 }}>
        <button onClick={onBack} style={{ marginRight: 10 }}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default OnboardingStep11;
