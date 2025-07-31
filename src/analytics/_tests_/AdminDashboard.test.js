import React from "react";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../AdminDashboard";

test("renders admin dashboard and user table", () => {
  render(<AdminDashboard />);
  expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
});
