// /src/search/SearchPage.jsx
import usePremium from '../premium/usePremium';
import GoPremiumButton from '../payments/GoPremiumButton.jsx';
import React, { useEffect, useState } from 'react';
import './SearchPage.css';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// --- Helpers for "Other" matching ---
const norm = (s) => (s ?? '').toString().toLowerCase().trim();

const KNOWN = {
  gender: new Set(['male', 'female']),
  orientation: new Set(['straight', 'gay']),
  hairColor: new Set(['black', 'brown', 'blonde', 'red', 'gray']),
  religion: new Set(['christian', 'jewish', 'muslim', 'hindu', 'spiritual', 'atheist']),
  ethnicity: new Set(['white', 'black', 'asian', 'hispanic', 'middle eastern']),
  bodyType: new Set(['slim', 'average', 'athletic', 'muscular', 'curvy', 'heavyset']),
  intent: new Set(['long-term', 'casual', 'marriage', 'new friends', 'not sure']),
};

// If filter === "Other", match any user value that's NOT in the known set (or explicitly "other")
function matchField(filterVal, userVal, knownSet) {
  if (!filterVal) return true;
  const f = norm(filterVal);
  const u = norm(userVal);
  if (f === 'other') {
    return !!u && (!knownSet.has(u) || u === 'other');
  }
  return u === f;
}

const SearchPage = () => {
  const { isPremium, loading } = usePremium();
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

  // Filters state
  const [filters, setFilters] = useState({
    // Basic (free)
    minAge: 18,
    maxAge: 99,
    city: '',

    // Advanced (premium)
    gender: '',
    orientation: '',
    minFeet: 4,
    minInches: 10,
    maxFeet: 7,
    maxInches: 0,
    hairColor: '',
    religion: '',
    ethnicity: '',
    bodyType: '',
    intent: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setUsers(data);

      const uniqueCities = Array.from(
        new Set(data.map(u => (u.city || '').trim()).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));
      setCities(uniqueCities);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const inchesFromFeetAndInches = (feet, inches) =>
    parseInt(feet || 0, 10) * 12 + parseInt(inches || 0, 10);

  const applyFilters = () => {
    // Only age + location for free users; all filters for premium
    const eff = isPremium
      ? filters
      : {
          minAge: filters.minAge,
          maxAge: filters.maxAge,
          city: filters.city,
        };

    // Height range only matters for premium
    const minHeightInches = isPremium
      ? inchesFromFeetAndInches(filters.minFeet, filters.minInches)
      : 0;
    const maxHeightInches = isPremium
      ? inchesFromFeetAndInches(filters.maxFeet, filters.maxInches)
      : Number.MAX_SAFE_INTEGER;

    return users.filter((user) => {
      const inAge =
        typeof user.age === 'number' &&
        user.age >= eff.minAge &&
        user.age <= eff.maxAge;

      const inCity =
        !eff.city || (user.city && String(user.city).trim() === eff.city);

      if (!isPremium) {
        // Free tier: age + location only
        return inAge && inCity;
      }

      // Premium: apply advanced filters, with "Other" logic
      const matchesGender = matchField(eff.gender, user.gender, KNOWN.gender);
      const matchesOrientation = matchField(eff.orientation, user.orientation, KNOWN.orientation);
      const matchesHeight =
        typeof user.height === 'number' &&
        user.height >= minHeightInches &&
        user.height <= maxHeightInches;
      const matchesHair = matchField(eff.hairColor, user.hairColor, KNOWN.hairColor);
      const matchesReligion = matchField(eff.religion, user.religion, KNOWN.religion);
      const matchesEthnicity = matchField(eff.ethnicity, user.ethnicity, KNOWN.ethnicity);
      const matchesBody = matchField(eff.bodyType, user.bodyType, KNOWN.bodyType);
      const matchesIntent = matchField(eff.intent, user.intent, KNOWN.intent);

      return (
        inAge &&
        inCity &&
        matchesGender &&
        matchesOrientation &&
        matchesHeight &&
        matchesHair &&
        matchesReligion &&
        matchesEthnicity &&
        matchesBody &&
        matchesIntent
      );
    });
  };

  const filteredUsers = applyFilters();

  if (loading) {
    return (
      <div className="search-page">
        <h2>Search Profiles</h2>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="search-page">
      <h2>Search Profiles</h2>

      <div className="filters-container">
        {/* Basic filters (always visible) */}
        <div className="filter-group">
          <label>Age Range:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="minAge"
              min="18"
              value={filters.minAge}
              onChange={(e) => handleRangeChange('minAge', e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              name="maxAge"
              min="18"
              value={filters.maxAge}
              onChange={(e) => handleRangeChange('maxAge', e.target.value)}
            />
          </div>

          <label>Location:</label>
          <select name="city" value={filters.city} onChange={handleChange}>
            <option value="">Anywhere</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Advanced filters (premium only) */}
        {isPremium ? (
          <div className="filter-group">
            <label>Sex:</label>
            <select name="gender" onChange={handleChange} value={filters.gender}>
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Orientation:</label>
            <select
              name="orientation"
              onChange={handleChange}
              value={filters.orientation}
            >
              <option value="">Any</option>
              <option value="Straight">Straight</option>
              <option value="Gay">Gay</option>
              <option value="Other">Other</option>
            </select>

            <label>Height Range:</label>
            <div className="range-inputs">
              <select name="minFeet" value={filters.minFeet} onChange={handleChange}>
                {[...Array(4).keys()].map(i => (
                  <option key={i + 4} value={i + 4}>{i + 4}'</option>
                ))}
              </select>
              <select name="minInches" value={filters.minInches} onChange={handleChange}>
                {[...Array(12).keys()].map(i => (
                  <option key={i} value={i}>{i}"</option>
                ))}
              </select>
              <span>to</span>
              <select name="maxFeet" value={filters.maxFeet} onChange={handleChange}>
                {[...Array(4).keys()].map(i => (
                  <option key={i + 4} value={i + 4}>{i + 4}'</option>
                ))}
              </select>
              <select name="maxInches" value={filters.maxInches} onChange={handleChange}>
                {[...Array(12).keys()].map(i => (
                  <option key={i} value={i}>{i}"</option>
                ))}
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
              <option value="Other">Other</option>
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
              <option value="Other">Other</option>
            </select>

            <label>Ethnicity:</label>
            <select name="ethnicity" onChange={handleChange} value={filters.ethnicity}>
              <option value="">Any</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Asian">Asian</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="Other">Other</option>
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
              <option value="Other">Other</option>
            </select>

            {/* Premium-only: Dating intent filter */}
            <label>Dating Intent:</label>
            <select name="intent" onChange={handleChange} value={filters.intent}>
              <option value="">Any</option>
              <option value="Long-term">Long-term</option>
              <option value="Casual">Casual</option>
              <option value="Marriage">Marriage</option>
              <option value="New friends">New friends</option>
              <option value="Not sure">Not sure</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ) : (
          // Upsell panel for free users
          <div className="filter-group" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: 16 }}>
            <p style={{ marginTop: 0, fontWeight: 700 }}>Unlock advanced filters:</p>
            <ul style={{ marginTop: 6 }}>
              <li>Sex & Orientation (incl. Other)</li>
              <li>Height range</li>
              <li>Hair color, Religion, Ethnicity (incl. Other)</li>
              <li>Body type (incl. Other)</li>
              <li>Dating intent (incl. Other)</li>
            </ul>
            <GoPremiumButton label="Unlock Premium Filters" />
          </div>
        )}
      </div>

      <div className="results-container">
        <h3>Results ({filteredUsers.length})</h3>
        <div className="results-grid">
          {filteredUsers.map((user, index) => (
            <div key={index} className="profile-card">
              {user.photoURL && <img src={user.photoURL} alt={user.name || 'User'} />}
              <h4>
                {user.name || 'Unknown'}
                {typeof user.age === 'number' ? `, ${user.age}` : ''}
              </h4>
              <p>{[user.gender, user.orientation].filter(Boolean).join(' - ')}</p>
              <p>{[user.ethnicity, user.bodyType].filter(Boolean).join(', ')}</p>
              <p>{user.city || ''}</p>
              {user.bio && <p>{user.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
