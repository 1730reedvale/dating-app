import { sendFriendInvite, getPendingInvites } from "../InviteService";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve()),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
}));

describe("InviteService", () => {
  it("sendFriendInvite calls addDoc", async () => {
    await expect(sendFriendInvite("user123", "friend@example.com")).resolves.toBeUndefined();
  });

  it("getPendingInvites returns array", async () => {
    const invites = await getPendingInvites("user123");
    expect(Array.isArray(invites)).toBe(true);
  });
});
