import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { PRICE_IDS, PLAN_LABELS } from "./priceConfig.js";

const SERVER_URL = "http://localhost:5252"; // updated port

export default function CheckoutPage() {
  const { currentUser } = useAuth() || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priceId, setPriceId] = useState("");

  useEffect(() => {
    setPriceId(PRICE_IDS.monthly || "");
  }, []);

  const priceOptions = [
    { id: PRICE_IDS.monthly, label: PLAN_LABELS.monthly },
    { id: PRICE_IDS.yearly, label: PLAN_LABELS.yearly },
  ].filter((p) => !!p.id);

  const startCheckout = async () => {
    setError("");

    if (!currentUser?.uid) {
      setError("You must be logged in to upgrade.");
      return;
    }
    if (!priceId) {
      setError("Please select a subscription option.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: currentUser.uid,
          priceId,
          successUrl: window.location.origin + "/payments/success",
          cancelUrl: window.location.origin + "/payments/cancel",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Server did not return a checkout URL.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        typeof err?.message === "string"
          ? err.message
          : "There was an error starting the checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Upgrade to Premium</h1>
      <p>Select your subscription plan:</p>

      <select
        value={priceId}
        onChange={(e) => setPriceId(e.target.value)}
        disabled={loading}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        {priceOptions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>

      <br />
      <button
        onClick={startCheckout}
        disabled={loading}
        style={{
          backgroundColor: "#FF7A00",
          color: "white",
          padding: "0.75rem 1.5rem",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "Processing..." : "Go Premium"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          {error}
        </p>
      )}
    </div>
  );
}
