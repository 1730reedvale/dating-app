// src/search/SearchFilters.js

import React, { useState, useEffect } from "react";

const hobbiesOptions = [
  "Hiking",
  "Running",
  "Swimming",
  "Cycling",
  "Yoga",
  "Gym",
  "Soccer",
  "Basketball",
  "Tennis",
  "Golf",
  "Baseball",
  "Skiing",
  "Skateboarding",
  "Dancing",
  "Martial Arts",
  "Fishing",
  "Other",
];

const lifestyleOptions = [
  "Active",
  "Adventurous",
  "Studious",
  "Homebody",
  "Social",
  "Workaholic",
  "Creative",
  "Relaxed",
];

const interestsOptions = [
  "Traveling",
  "Music",
  "Reading",
  "Movies",
  "Cooking",
  "Art",
  "Technology",
  "Gaming",
  "Photography",
  "Volunteering",
  "Fitness",
  "Gardening",
  "Fashion",
  "Writing",
  "Other",
];

const distanceOptions = [1, 5, 10, 25, 50, 100]; // miles

const SearchFilters = ({ filters, onChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (field, value) => {
    const updated = { ...localFilters, [field]: value };
    setLocalFilters(updated);
    onChange(updated);
  };

  const toggleArrayItem = (field, value) => {
    let arr = localFilters[field] || [];
    if (arr.includes(value)) {
      arr = arr.filter((item) => item !== value);
    } else {
      arr = [...arr, value];
    }
    handleChange(field, arr);
  };

  return (
    <div style={{ marginBottom: 20, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
      <div style={{ marginBottom: 12 }}>
        <label>
          Search Radius (miles):{" "}
          <select
            value={localFilters.locationRadius}
            onChange={(e) => handleChange("locationRadius", Number(e.target.value))}
          >
            {distanceOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Lifestyle:</strong>
        <div>
          {lifestyleOptions.map((option) => (
            <label key={option} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={localFilters.lifestyle.includes(option)}
                onChange={() => toggleArrayItem("lifestyle", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Hobbies:</strong>
        <div>
          {hobbiesOptions.map((option) => (
            <label key={option} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={localFilters.hobbies.includes(option)}
                onChange={() => toggleArrayItem("hobbies", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Interests:</strong>
        <div>
          {interestsOptions.map((option) => (
            <label key={option} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={localFilters.interests.includes(option)}
                onChange={() => toggleArrayItem("interests", option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Additional filters can be added similarly */}
    </div>
  );
};

export default SearchFilters;
