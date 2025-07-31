import React from "react";

const OnboardingStep13 = ({ onContinue }) => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, textAlign: "center" }}>
      <h2>Welcome to Your New Dating Experience!</h2>
      <p>
        Now that your profile is set up, you can start searching, matching, and connecting.
      </p>
      <p>
        Explore the app and find your perfect match!
      </p>
      <button
        onClick={onContinue}
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
      >
        Let's Go!
      </button>
    </div>
  );
};

export default OnboardingStep13;
