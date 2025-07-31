import { calculateConfidenceScore } from "../ConfidenceModel";

test("calculateConfidenceScore returns 0 for empty array", () => {
  expect(calculateConfidenceScore([])).toBe(0);
});

test("calculateConfidenceScore returns value between 0 and 1", () => {
  const now = Date.now();
  const ratings = [
    { createdAt: { toMillis: () => now - 1000 } },
    { createdAt: { toMillis: () => now - 5000 } },
  ];
  const score = calculateConfidenceScore(ratings);
  expect(score).toBeGreaterThanOrEqual(0);
  expect(score).toBeLessThanOrEqual(1);
});
