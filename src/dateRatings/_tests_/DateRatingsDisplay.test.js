import React from "react";
import { render, screen } from "@testing-library/react";
import DateRatingsDisplay from "../DateRatingsDisplay";

test("renders date ratings display", () => {
  render(<DateRatingsDisplay userId="user123" />);
  expect(screen.getByText(/date ratings summary/i)).toBeInTheDocument();
});
