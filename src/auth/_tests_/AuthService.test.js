import firebase from "firebase/compat/app";
import "firebase/compat/auth";

test("should return auth instance", () => {
  const auth = firebase.auth();
  expect(auth).toBeDefined();
});
