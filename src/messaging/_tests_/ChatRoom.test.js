import React from "react";
import { render, screen } from "@testing-library/react";
import ChatRoom from "../ChatRoom";

test("renders chat room input and button", () => {
  render(<ChatRoom chatId="chat123" currentUserId="user123" />);
  expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
});
