import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VirtualPersonality from "../VirtualPersonality";

test("renders personalities and allows selection", () => {
  const onSelect = jest.fn();
  render(<VirtualPersonality selected="" onSelect={onSelect} />);

  const cheerful = screen.getByLabelText(/Cheerful Charlie/i);
  fireEvent.click(cheerful);
  expect(onSelect).toHaveBeenCalledWith("Cheerful Charlie");
});
