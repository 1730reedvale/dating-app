import React, { useEffect, useState } from "react";

const OnboardingGrace = ({ userId, isFirstTimeUser }) => {
  const [graceActive, setGraceActive] = useState(false);

  useEffect(() => {
    if (isFirstTimeUser) {
      // Activate grace period logic (e.g., no penalties or restrictions)
      setGraceActive(true);

      // Deactivate after 7 days (example)
      const timer = setTimeout(() => {
        setGraceActive(false);
      }, 7 * 24 * 60 * 60 * 1000);

      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser]);

  if (!graceActive) return null;

  return (
    <div>
      <p>Welcome! You are in your onboarding grace period. Enjoy full access.</p>
    </div>
  );
};

export default OnboardingGrace;
