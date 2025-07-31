import { sendMessage, subscribeToMessages } from "../ChatService";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve()),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn((query, callback) => {
    callback({ forEach: (fn) => [] });
    return () => {};
  }),
}));

describe("ChatService", () => {
  it("sendMessage calls addDoc", async () => {
    await expect(sendMessage("chat123", { text: "Hello", senderId: "user123" })).resolves.toBeUndefined();
  });

  it("subscribeToMessages calls callback", () => {
    const callback = jest.fn();
    const unsubscribe = subscribeToMessages("chat123", callback);
    unsubscribe();
    expect(callback).toHaveBeenCalled();
  });
});