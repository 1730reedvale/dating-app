import { checkAndApplyShadowban } from "../ShadowbanService";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ forEach: (fn) => {} })),
  updateDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(),
}));

describe("ShadowbanService", () => {
  it("checkAndApplyShadowban returns boolean", async () => {
    const result = await checkAndApplyShadowban("user123");
    expect(typeof result).toBe("boolean");
  });
});
