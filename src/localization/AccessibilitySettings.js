import React, { useState, useEffect } from "react";

const AccessibilitySettings = () => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    // Load settings from local storage or defaults
    const storedHighContrast = localStorage.getItem("highContrast") === "true";
    const storedLargeText = localStorage.getItem("largeText") === "true";
    setHighContrast(storedHighContrast);
    setLargeText(storedLargeText);
  }, []);

  useEffect(() => {
    // Apply settings to document body
    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("large-text", largeText);

    // Save settings
    localStorage.setItem("highContrast", highContrast);
    localStorage.setItem("largeText", largeText);
  }, [highContrast, largeText]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={() => setHighContrast(!highContrast)}
        />
        Enable High Contrast Mode
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={largeText}
          onChange={() => setLargeText(!largeText)}
        />
        Enable Large Text
      </label>
    </div>
  );
};

export default AccessibilitySettings;
