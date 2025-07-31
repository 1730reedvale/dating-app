import { fetchPotentialMatches, calculateMatchScore } from "../MatchEngine";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
}));

describe("MatchEngine", () => {
  it("fetchPotentialMatches returns array", async () => {
    const matches = await fetchPotentialMatches("user123", {});
    expect(Array.isArray(matches)).toBe(true);
  });

  it("calculateMatchScore returns a number", () => {
    const userRatings = { trustworthiness: 4, empathy: 3 };
    const candidateRatings = { trustworthiness: 3, empathy: 4 };
    const score = calculateMatchScore(userRatings, candidateRatings);
    expect(typeof score).toBe("number");
  });
});