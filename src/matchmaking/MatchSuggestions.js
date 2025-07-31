// src/matchmaking/MatchSuggestions.js

import React, { useEffect, useState } from "react";
import { fetchPotentialMatches, calculateMatchScore } from "./MatchEngine";

const MatchSuggestions = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      setLoading(true);
      const potentialMatches = await fetchPotentialMatches();
      // Calculate score for each match
      const scoredMatches = potentialMatches.map((match) => ({
        ...match,
        score: calculateMatchScore(match),
      }));
      // Sort by score descending
      scoredMatches.sort((a, b) => b.score - a.score);
      setMatches(scoredMatches);
      setLoading(false);
    };

    loadMatches();
  }, []);

  if (loading) return <p>Loading match suggestions...</p>;

  if (matches.length === 0) return <p>No matches found at this time.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>Suggested Matches</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {matches.map((match) => (
          <li key={match.id} style={{ marginBottom: 15, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
            <strong>{match.displayName}</strong> - Score: {match.score.toFixed(2)}
            <p>{match.bio || "No bio available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchSuggestions;
