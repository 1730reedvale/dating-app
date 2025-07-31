import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function LoginStatus() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return <p>Logged in as: {user.email}</p>;
  } else {
    return <p>Not logged in</p>;
  }
}
