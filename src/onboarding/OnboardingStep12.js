import React from "react";

const OnboardingStep12 = ({ onFinish, profile }) => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, textAlign: "center" }}>
      <h2>All Set!</h2>
      <p>Thank you for completing your profile setup.</p>
      <p>Here’s a quick summary of your profile:</p>
      <pre
        style={{
          textAlign: "left",
          background: "#f0f0f0",
          padding: 15,
          borderRadius: 8,
          overflowX: "auto",
          maxHeight: 300,
          whiteSpace: "pre-wrap"
        }}
      >
        {JSON.stringify(profile, null, 2)}
      </pre>
      <button
        onClick={onFinish}
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
      >
        Start Exploring
      </button>
    </div>
  );
};

export default OnboardingStep12;
