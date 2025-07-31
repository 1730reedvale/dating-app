import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProfileSettingsPage = ({ userId }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, 'users', userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || '');
        setBio(data.bio || '');
        setPhotoURL(data.photoURL || '');
      }
    };
    fetchProfile();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, 'users', userId);
      await updateDoc(ref, {
        name,
        bio,
        photoURL,
      });
      setStatus('✅ Profile updated!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Failed to update profile');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Your Profile</h2>
        <form onSubmit={handleSave}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />

          <label style={styles.label}>Bio</label>
          <textarea
            style={{ ...styles.input, height: '100px' }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about yourself"
          />

          <label style={styles.label}>Photo URL</label>
          <input
            style={styles.input}
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://..."
          />

          <button type="submit" style={styles.button}>
            Save Changes
          </button>
        </form>
        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#1e2a38',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    color: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#ffa500',
    color: '#000',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  status: {
    marginTop: '1rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default ProfileSettingsPage;
