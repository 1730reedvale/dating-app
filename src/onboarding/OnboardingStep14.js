import React, { useState } from "react";

const OnboardingStep14 = ({ profile, onUpdateProfile, onContinue }) => {
  const [preferredAgeRange, setPreferredAgeRange] = useState(profile.preferredAgeRange || [25, 35]);
  const [preferredDistance, setPreferredDistance] = useState(profile.preferredDistance || 10);
  const [interests, setInterests] = useState(profile.interests || []);

  const availableInterests = [
    "Travel", "Music", "Sports", "Reading", "Cooking", "Fitness", "Art", "Movies", "Gaming", "Outdoors"
  ];

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ preferredAgeRange, preferredDistance, interests });
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Tell us about your preferences</h2>

      <label>
        Preferred Age Range: {preferredAgeRange[0]} - {preferredAgeRange[1]}
        <br />
        <input
          type="range"
          min={18}
          max={70}
          value={preferredAgeRange[0]}
          onChange={(e) => setPreferredAgeRange([Number(e.target.value), preferredAgeRange[1]])}
        />
        <input
          type="range"
          min={18}
          max={70}
          value={preferredAgeRange[1]}
          onChange={(e) => setPreferredAgeRange([preferredAgeRange[0], Number(e.target.value)])}
        />
      </label>

      <br /><br />

      <label>
        Preferred Distance (miles): {preferredDistance}
        <br />
        <input
          type="range"
          min={1}
          max={100}
          value={preferredDistance}
          onChange={(e) => setPreferredDistance(Number(e.target.value))}
        />
      </label>

      <br /><br />

      <div>
        <strong>Select Interests:</strong>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
          {availableInterests.map((interest) => (
            <label key={interest} style={{ border: "1px solid #ccc", borderRadius: 4, padding: "4px 8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                style={{ marginRight: 6 }}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}>
        Continue
      </button>
    </form>
  );
};

export default OnboardingStep14;
