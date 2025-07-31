import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DateStorySharing from "../DateStorySharing";

test("renders story form and submits", () => {
  render(<DateStorySharing userId="user123" />);

  const textarea = screen.getByPlaceholderText(/share your date story here/i);
  const button = screen.getByRole("button", { name: /submit story/i });

  fireEvent.change(textarea, { target: { value: "Great date!" } });
  fireEvent.click(button);

  expect(screen.getByText(/thank you for sharing/i)).toBeInTheDocument();
});
