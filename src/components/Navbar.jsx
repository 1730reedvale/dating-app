// /src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { auth } from "../firebase/firebase";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">DateRate 💙🧡</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/search">Search</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/invitations">Invitations</Link>
        <Link to="/online">Who’s Online</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/settings">Settings</Link>
        {!currentUser ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
