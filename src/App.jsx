import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";

// Core pages
import HomePage from "./home/HomePage.jsx";
import MatchesPage from "./matches/MatchesPage.jsx";
import MessagingPage from "./messaging/MessagingPage.jsx";
import ProfilePage from "./profile/ProfilePage.jsx";
import SearchPage from "./search/SearchPage.jsx";
import MutualMatchesPage from "./matchmaking/MutualMatchesPage.jsx";

// Auth pages (these paths match what you've used before)
import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";

// Payments
import CheckoutPage from "./payments/CheckoutPage.jsx";
import SuccessPage from "./payments/SuccessPage.jsx";
import CancelPage from "./payments/CancelPage.jsx";

// Simple inline FAQ (safe fallback if you don't have a file yet)
const FAQInline = () => (
  <div style={{ padding: "1.25rem", color: "white" }}>
    <h1>FAQ</h1>
    <p>Coming soon.</p>
  </div>
);

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // Reversed ombré (dark → light)
        background:
          "linear-gradient(to bottom, #0B1E3A 0%, #0E2A57 50%, #1C3E75 100%)",
      }}
    >
      <NavBar />

      {/* Body */}
      <main style={{ flex: 1, width: "100%", maxWidth: 1200, margin: "0 auto" }}>
        <Routes>
          {/* Core */}
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/mutual-matches" element={<MutualMatchesPage />} />
          <Route path="/messages" element={<MessagingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/faq" element={<FAQInline />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Payments */}
          <Route path="/payments/checkout" element={<CheckoutPage />} />
          <Route path="/payments/success" element={<SuccessPage />} />
          <Route path="/payments/cancel" element={<CancelPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <div style={{ height: 24 }} />
    </div>
  );
}
