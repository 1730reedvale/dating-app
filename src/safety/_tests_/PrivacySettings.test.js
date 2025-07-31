import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrivacySettings from "../PrivacySettings";

test("renders privacy settings and toggles options", async () => {
  render(<PrivacySettings userId="user123" />);

  const profileCheckbox = screen.getByLabelText(/make my profile visible to others/i);
  const ratingsCheckbox = screen.getByLabelText(/show my ratings to others/i);

  expect(profileCheckbox).toBeInTheDocument();
  expect(ratingsCheckbox).toBeInTheDocument();

  fireEvent.click(profileCheckbox);
  fireEvent.click(ratingsCheckbox);
});
