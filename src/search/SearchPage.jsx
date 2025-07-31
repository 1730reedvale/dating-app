// /src/search/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SearchPage = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    orientation: '',
    minAge: 18,
    maxAge: 99,
    minFeet: 4,
    minInches: 10,
    maxFeet: 7,
    maxInches: 0,
    hairColor: '',
    religion: '',
    ethnicity: '',
    bodyType: '',
    intent: '',
    distance: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const inchesFromFeetAndInches = (feet, inches) => parseInt(feet) * 12 + parseInt(inches);

  const applyFilters = () => {
    const minHeightInches = inchesFromFeetAndInches(filters.minFeet, filters.minInches);
    const maxHeightInches = inchesFromFeetAndInches(filters.maxFeet, filters.maxInches);

    return users.filter(user => {
      return (
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.orientation || user.orientation === filters.orientation) &&
        user.age >= filters.minAge &&
        user.age <= filters.maxAge &&
        user.height >= minHeightInches &&
        user.height <= maxHeightInches &&
        (!filters.hairColor || user.hairColor === filters.hairColor) &&
        (!filters.religion || user.religion === filters.religion) &&
        (!filters.ethnicity || user.ethnicity === filters.ethnicity) &&
        (!filters.bodyType || user.bodyType === filters.bodyType) &&
        (!filters.intent || user.intent === filters.intent)
      );
    });
  };

  const filteredUsers = applyFilters();

  return (
    <div className="search-page">
      <h2>Search Profiles</h2>
      <div className="filters-container">
        <div className="filter-group">
          <label>Sex:</label>
          <select name="gender" onChange={handleChange} value={filters.gender}>
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Orientation:</label>
          <select name="orientation" onChange={handleChange} value={filters.orientation}>
            <option value="">Any</option>
            <option value="Straight">Straight</option>
            <option value="Gay">Gay</option>
          </select>

          <label>Age Range:</label>
          <div className="range-inputs">
            <input type="number" name="minAge" min="18" value={filters.minAge} onChange={(e) => handleRangeChange('minAge', e.target.value)} />
            <span>to</span>
            <input type="number" name="maxAge" min="18" value={filters.maxAge} onChange={(e) => handleRangeChange('maxAge', e.target.value)} />
          </div>

          <label>Height Range:</label>
          <div className="range-inputs">
            <select name="minFeet" value={filters.minFeet} onChange={handleChange}>
              {[...Array(4).keys()].map(i => <option key={i+4} value={i+4}>{i+4}'</option>)}
            </select>
            <select name="minInches" value={filters.minInches} onChange={handleChange}>
              {[...Array(12).keys()].map(i => <option key={i} value={i}>{i}"</option>)}
            </select>
            <span>to</span>
            <select name="maxFeet" value={filters.maxFeet} onChange={handleChange}>
              {[...Array(4).keys()].map(i => <option key={i+4} value={i+4}>{i+4}'</option>)}
            </select>
            <select name="maxInches" value={filters.maxInches} onChange={handleChange}>
              {[...Array(12).keys()].map(i => <option key={i} value={i}>{i}"</option>)}
            </select>
          </div>

          <label>Hair Color:</label>
          <select name="hairColor" onChange={handleChange} value={filters.hairColor}>
            <option value="">Any</option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            <option value="Blonde">Blonde</option>
            <option value="Red">Red</option>
            <option value="Gray">Gray</option>
          </select>

          <label>Religion:</label>
          <select name="religion" onChange={handleChange} value={filters.religion}>
            <option value="">Any</option>
            <option value="Christian">Christian</option>
            <option value="Jewish">Jewish</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindu">Hindu</option>
            <option value="Spiritual">Spiritual</option>
            <option value="Atheist">Atheist</option>
          </select>

          <label>Ethnicity:</label>
          <select name="ethnicity" onChange={handleChange} value={filters.ethnicity}>
            <option value="">Any</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Asian">Asian</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Middle Eastern">Middle Eastern</option>
          </select>

          <label>Body Type:</label>
          <select name="bodyType" onChange={handleChange} value={filters.bodyType}>
            <option value="">Any</option>
            <option value="Slim">Slim</option>
            <option value="Average">Average</option>
            <option value="Athletic">Athletic</option>
            <option value="Muscular">Muscular</option>
            <option value="Curvy">Curvy</option>
            <option value="Heavyset">Heavyset</option>
          </select>
        </div>
      </div>

      <div className="results-container">
        <h3>Results ({filteredUsers.length})</h3>
        <div className="results-grid">
          {filteredUsers.map((user, index) => (
            <div key={index} className="profile-card">
              <img src={user.photoURL} alt={user.name} />
              <h4>{user.name}, {user.age}</h4>
              <p>{user.gender} - {user.orientation}</p>
              <p>{user.ethnicity}, {user.bodyType}</p>
              <p>{user.city}</p>
              <p>{user.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
