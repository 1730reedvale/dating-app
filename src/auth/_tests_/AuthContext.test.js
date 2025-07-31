import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "../AuthContext";

test("AuthContext provides currentUser and logout", () => {
  let contextValue;
  const TestComponent = () => {
    contextValue = React.useContext(AuthContext);
    return null;
  };

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(contextValue).toHaveProperty("currentUser");
  expect(contextValue).toHaveProperty("logout");
  expect(typeof contextValue.logout).toBe("function");
});
