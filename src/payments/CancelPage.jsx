import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div style={{ padding: "2rem", color: "white", textAlign: "center" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was not completed. No changes have been made to your account.</p>
      <p>If you ran into an issue, you can try again below.</p>
      <Link
        to="/payments/checkout"
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
        Try Again
      </Link>
    </div>
  );
};

export default CancelPage;
