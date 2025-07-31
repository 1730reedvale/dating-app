import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FriendRatingForm from "../FriendRatingForm";

test("renders friend rating form and submits", () => {
  const onCompleteMock = jest.fn();

  render(<FriendRatingForm userId="user123" onComplete={onCompleteMock} />);

  const sliders = screen.getAllByRole("slider");
  sliders.forEach((slider) => {
    fireEvent.change(slider, { target: { value: 4 } });
  });

  const submitButton = screen.getByRole("button", { name: /submit rating/i });
  fireEvent.click(submitButton);

  expect(onCompleteMock).toHaveBeenCalled();
});
