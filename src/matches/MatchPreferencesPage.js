import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const currentUserId = 'cGTsloYaSXXwLGiiwSfZBLdinhk2';

const hairOptions = ['black', 'brown', 'blonde', 'red', 'gray', 'other'];
const nationalityOptions = ['American', 'Canadian', 'Mexican', 'British', 'French', 'German', 'Other'];
const religionOptions = ['Christian', 'Jewish', 'Muslim', 'Hindu', 'Buddhist', 'Atheist', 'Other'];

const MatchPreferencesPage = () => {
  const [prefs, setPrefs] = useState({
    gender: '',
    sex: '',
    minAge: '',
    maxAge: '',
    maxDistance: '',
    nationalities: [],
    religions: [],
    hairColors: [],
    hiddenFromSearch: false,
  });

  const handleMultiSelect = (field, value) => {
    setPrefs((prev) => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const handleChange = (field, value) => {
    setPrefs((prev) => ({ ...prev, [field]: value }));
  };

  const savePreferences = async () => {
    try {
      await setDoc(doc(db, 'users', currentUserId), { preferences: prefs }, { merge: true });
      alert('Preferences saved!');
    } catch (err) {
      console.error('Error saving preferences:', err);
      alert('Failed to save preferences');
    }
  };

  useEffect(() => {
    const fetchPrefs = async () => {
      const snap = await getDoc(doc(db, 'users', currentUserId));
      if (snap.exists()) {
        const data = snap.data();
        if (data.preferences) setPrefs((prev) => ({ ...prev, ...data.preferences }));
      }
    };
    fetchPrefs();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Your Match Preferences</h2>

      <div style={styles.inputRow}>
        <select value={prefs.gender} onChange={(e) => handleChange('gender', e.target.value)} style={styles.input}>
          <option value="">Preferred Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Nonbinary</option>
        </select>
        <select value={prefs.sex} onChange={(e) => handleChange('sex', e.target.value)} style={styles.input}>
          <option value="">Sex Assigned at Birth</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="intersex">Intersex</option>
        </select>
        <input type="number" placeholder="Min Age" value={prefs.minAge} onChange={(e) => handleChange('minAge', e.target.value)} style={styles.input} />
        <input type="number" placeholder="Max Age" value={prefs.maxAge} onChange={(e) => handleChange('maxAge', e.target.value)} style={styles.input} />
        <input type="number" placeholder="Max Distance (miles)" value={prefs.maxDistance} onChange={(e) => handleChange('maxDistance', e.target.value)} style={styles.input} />
      </div>

      <div style={styles.section}>
        {[
          { label: 'Hair Colors', options: hairOptions, field: 'hairColors' },
          { label: 'Nationalities', options: nationalityOptions, field: 'nationalities' },
          { label: 'Religions', options: religionOptions, field: 'religions' },
        ].map(({ label, options, field }) => (
          <div key={field}>
            <h4>{label}</h4>
            {options.map((option) => (
              <label key={option} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={prefs[field].includes(option)}
                  onChange={() => handleMultiSelect(field, option)}
                />{' '}
                {option}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label>
          <input
            type="checkbox"
            checked={!prefs.hiddenFromSearch}
            onChange={() => handleChange('hiddenFromSearch', !prefs.hiddenFromSearch)}
          />{' '}
          Show my profile in searches and matches
        </label>
      </div>

      <button onClick={savePreferences} style={styles.button}>Save Preferences</button>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#1e2a38',
    color: '#fff',
    padding: '2rem',
    minHeight: '100vh',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  inputRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '220px',
  },
  section: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#ffa500',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  },
};

export default MatchPreferencesPage;
