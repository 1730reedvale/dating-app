// /src/matches/MatchesPage.jsx
import React from 'react';
import './MatchesPage.css';

const mockProfiles = Array.from({ length: 12 }).map((_, i) => ({
  name: `User ${i + 1}`,
  age: 24 + (i % 5),
  location: 'Los Angeles, CA',
  img: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 10}.jpg`,
}));

const MatchesPage = () => {
  return (
    <div className="matches-page">
      <h2>Your Matches</h2>
      <div className="matches-grid">
        {mockProfiles.map((user, index) => (
          <div key={index} className="match-card">
            <img src={user.img} alt={user.name} className="match-photo" />
            <h3>{user.name}, {user.age}</h3>
            <p>{user.location}</p>
            <button className="view-button">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
