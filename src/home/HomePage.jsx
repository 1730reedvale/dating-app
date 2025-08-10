// /src/home/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="welcome-section">
        <h1>Welcome to DatingRating</h1>
        <p>Rate your dating profile. Get feedback. Find better matches.</p>
        <button className="cta-button">Get Started</button>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>📊 Profile Ratings</h3>
          <p>Get rated by peers and experts. Improve your profile visibility.</p>
        </div>
        <div className="feature-card">
          <h3>💬 Constructive Feedback</h3>
          <p>Receive helpful suggestions to boost your match potential.</p>
        </div>
        <div className="feature-card">
          <h3>🔥 Real Matches</h3>
          <p>See who you're truly compatible with—based on data and vibe.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
