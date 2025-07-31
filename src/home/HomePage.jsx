import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-banner">
        <h1>Welcome to DateRate 💙🧡</h1>
        <p>Discover meaningful matches, powered by reputation.</p>
      </div>

      <div className="home-actions">
        <div className="home-card">
          <h3>Your Matches</h3>
          <p>Check out your new mutual matches for today.</p>
          <button>View Matches</button>
        </div>
        <div className="home-card">
          <h3>Ratings & Reviews</h3>
          <p>See what others are saying about you.</p>
          <button>View Profile Rating</button>
        </div>
        <div className="home-card">
          <h3>Go Premium</h3>
          <p>Unlock advanced search, visibility boost & more.</p>
          <button className="premium-btn">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
