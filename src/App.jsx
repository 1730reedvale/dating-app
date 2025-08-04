// /src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./home/HomePage";
import ProfilePage from "./profile/ProfilePage";
import MatchesPage from "./matches/MatchesPage";
import MessagingPage from "./messaging/MessagingPage";
import SearchPage from "./search/SearchPage";
import FAQPage from "./faq/FAQPage";
import SettingsPage from "./settings/SettingsPage";
import OnlinePage from "./online/OnlinePage";
import ViewProfilePage from "./view/TempPage";
import LoginPage from "./auth/LoginPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/messages" element={<MessagingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/online" element={<OnlinePage />} />
        <Route path="/view/:id" element={<ViewProfilePage />} />
	<Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
