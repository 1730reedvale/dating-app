import { applyRatingsDecay } from "../DecayEngine";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ forEach: jest.fn() })),
  updateDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(),
}));

describe("DecayEngine", () => {
  it("applyRatingsDecay runs without error", async () => {
    await expect(applyRatingsDecay()).resolves.toBeUndefined();
  });
});
