// /src/matches/MutualMatchesPage.jsx
import React from 'react';
import './MutualMatchesPage.css';

const mutualProfiles = Array.from({ length: 12 }).map((_, i) => ({
  name: `Mutual ${i + 1}`,
  age: 25 + (i % 4),
  location: 'New York, NY',
  img: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${30 + i}.jpg`,
}));

const MutualMatchesPage = () => {
  return (
    <div className="mutual-matches-page">
      <h2>Mutual Matches</h2>
      <div className="mutual-grid">
        {mutualProfiles.map((user, index) => (
          <div key={index} className="mutual-card">
            <img src={user.img} alt={user.name} className="mutual-photo" />
            <h3>{user.name}, {user.age}</h3>
            <p>{user.location}</p>
            <button className="view-button">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutualMatchesPage;
