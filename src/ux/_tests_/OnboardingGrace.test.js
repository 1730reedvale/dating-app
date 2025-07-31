import React from "react";
import { render, screen } from "@testing-library/react";
import OnboardingGrace from "../OnboardingGrace";

test("shows onboarding grace message when active", () => {
  jest.useFakeTimers();
  render(<OnboardingGrace userId="user123" isFirstTimeUser={true} />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  jest.runAllTimers();
});
