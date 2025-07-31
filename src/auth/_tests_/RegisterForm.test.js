import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

test("renders register form and submits", () => {
  render(<RegisterForm />);

  const displayNameInput = screen.getByPlaceholderText(/display name/i);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button", { name: /register/i });

  fireEvent.change(displayNameInput, { target: { value: "Test User" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(button);

  // Add assertions or mocks as needed
});
