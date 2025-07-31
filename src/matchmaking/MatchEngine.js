/**
 * Calculate a simple match score based on shared interests.
 * Extend this to include more sophisticated algorithms.
 */
export const calculateMatchScore = (userA, userB) => {
  if (!userA || !userB) return 0;

  const interestsA = userA.interests || [];
  const interestsB = userB.interests || [];

  const sharedInterests = interestsA.filter((interest) =>
    interestsB.includes(interest)
  );

  // Simple scoring: number of shared interests
  return sharedInterests.length;
};

/**
 * Fetch potential matches for a user.
 * This function can be expanded to apply filtering and sorting.
 */
export const getPotentialMatches = async (currentUser, allUsers) => {
  if (!currentUser || !allUsers) return [];

  // Filter out self
  const candidates = allUsers.filter((user) => user.id !== currentUser.id);

  // Map users with a match score
  const scoredCandidates = candidates.map((candidate) => ({
    user: candidate,
    score: calculateMatchScore(currentUser, candidate),
  }));

  // Sort descending by score
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Return sorted users
  return scoredCandidates.map((item) => item.user);
};
