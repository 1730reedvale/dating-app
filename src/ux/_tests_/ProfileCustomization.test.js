import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileCustomization from "../ProfileCustomization";

test("renders profile customization and selects style", () => {
  const onChange = jest.fn();
  render(<ProfileCustomization currentStyle="" onChange={onChange} />);

  const radio = screen.getByLabelText(/Playful/i);
  fireEvent.click(radio);
  expect(onChange).toHaveBeenCalledWith("Playful");
});
