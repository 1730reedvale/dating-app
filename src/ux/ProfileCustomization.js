import React, { useState, useEffect } from "react";

const profileStyles = [
  "Playful",
  "Serious",
  "Adventurous",
  "Intellectual",
  "Romantic",
];

const ProfileCustomization = ({ currentStyle, onChange }) => {
  const [selectedStyle, setSelectedStyle] = useState(currentStyle || "");

  useEffect(() => {
    onChange && onChange(selectedStyle);
  }, [selectedStyle, onChange]);

  return (
    <div>
      <h3>Choose your profile style:</h3>
      <ul>
        {profileStyles.map((style) => (
          <li key={style}>
            <label>
              <input
                type="radio"
                name="profileStyle"
                value={style}
                checked={selectedStyle === style}
                onChange={() => setSelectedStyle(style)}
              />
              {style}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCustomization;
