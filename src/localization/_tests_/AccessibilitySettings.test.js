import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AccessibilitySettings from "../AccessibilitySettings";

test("toggles high contrast and large text settings", () => {
  render(<AccessibilitySettings />);

  const highContrastCheckbox = screen.getByLabelText(/enable high contrast mode/i);
  const largeTextCheckbox = screen.getByLabelText(/enable large text/i);

  fireEvent.click(highContrastCheckbox);
  expect(highContrastCheckbox.checked).toBe(true);

  fireEvent.click(largeTextCheckbox);
  expect(largeTextCheckbox.checked).toBe(true);
});
