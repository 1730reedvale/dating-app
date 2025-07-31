import React from "react";

const personalities = [
  {
    name: "Cheerful Charlie",
    description: "Always upbeat and positive, spreading good vibes.",
  },
  {
    name: "Serious Sarah",
    description: "Thoughtful and introspective, values deep connections.",
  },
  {
    name: "Adventurous Alex",
    description: "Loves exploring and trying new experiences.",
  },
];

const VirtualPersonality = ({ selected, onSelect }) => {
  return (
    <div>
      <h3>Select a virtual personality:</h3>
      <ul>
        {personalities.map((p) => (
          <li key={p.name}>
            <label>
              <input
                type="radio"
                name="personality"
                value={p.name}
                checked={selected === p.name}
                onChange={() => onSelect(p.name)}
              />
              <strong>{p.name}:</strong> {p.description}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VirtualPersonality;
