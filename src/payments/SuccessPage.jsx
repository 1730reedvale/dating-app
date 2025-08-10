import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div style={{ padding: "2rem", color: "white", textAlign: "center" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for upgrading to Premium. Your benefits are now unlocked.</p>
      <p>You can now enjoy all premium features without limits.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#FF7A00",
          color: "white",
          textDecoration: "none",
          fontSize: "1rem"
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
