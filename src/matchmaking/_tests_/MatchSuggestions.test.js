import React from "react";
import { render, screen } from "@testing-library/react";
import MatchSuggestions from "../MatchSuggestions";

test("renders match suggestions header", () => {
  render(<MatchSuggestions userId="user123" userRatings={{}} />);
  expect(screen.getByText(/match suggestions/i)).toBeInTheDocument();
});
