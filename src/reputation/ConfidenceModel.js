/**
 * Calculates confidence score for a user's ratings based on number and recency.
 * @param {Array} ratings - Array of rating objects with `createdAt` timestamps.
 * @returns {number} Confidence score between 0 and 1.
 */
export const calculateConfidenceScore = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;

  const now = Date.now();
  const decayRate = 0.000001; // Decay per ms

  let weightedSum = 0;
  let totalWeight = 0;

  ratings.forEach(({ createdAt }) => {
    const age = now - createdAt.toMillis();
    const weight = Math.exp(-decayRate * age);
    weightedSum += weight;
    totalWeight += 1;
  });

  return weightedSum / totalWeight;
};
