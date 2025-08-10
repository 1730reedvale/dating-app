// /src/view/ViewProfilePage.jsx
import React from 'react';
import './ViewProfilePage.css';

const profile = {
  name: 'Sarah M.',
  age: 28,
  location: 'San Diego, CA',
  bio: 'Lover of books, beaches, and brunch. Let’s find the best taco spot together.',
  interests: ['Reading', 'Hiking', 'Travel', 'Photography'],
  photo: 'https://randomuser.me/api/portraits/women/44.jpg',
};

const ViewProfilePage = () => {
  return (
    <div className="view-profile-page">
      <div className="profile-card">
        <img src={profile.photo} alt={profile.name} className="profile-photo" />
        <h2>{profile.name}, {profile.age}</h2>
        <p className="location">{profile.location}</p>
        <p className="bio">"{profile.bio}"</p>
        <h4>Interests:</h4>
        <ul className="interests-list">
          {profile.interests.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="action-buttons">
          <button className="like-button">❤️ Like</button>
          <button className="message-button">💬 Message</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
