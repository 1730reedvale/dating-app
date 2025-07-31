import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { AuthContext } from "../AuthContext";

test("renders login form and submits", () => {
  const loginUser = jest.fn(() => Promise.resolve());
  const contextValue = { currentUser: null };

  render(
    <AuthContext.Provider value={contextValue}>
      <LoginForm />
    </AuthContext.Provider>
  );

  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const button = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(button);

  // You could add more assertions here depending on your mocks
});
