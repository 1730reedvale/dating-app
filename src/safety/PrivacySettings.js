// src/safety/PrivacySettings.js

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: "public", // options: public, friendsOnly, private
    showOnlineStatus: true,
    allowSearchByEmail: false,
    shareActivityStatus: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!auth.currentUser) return;
      setLoading(true);
      const docRef = doc(db, "privacySettings", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(db, "privacySettings", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, settings);
    } else {
      await setDoc(docRef, settings);
    }
    alert("Privacy settings saved.");
  };

  if (loading) return <p>Loading privacy settings...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Privacy Settings</h2>

      <label style={{ display: "block", marginBottom: 12 }}>
        Profile Visibility:
        <select
          value={settings.profileVisibility}
          onChange={e => handleChange("profileVisibility", e.target.value)}
          style={{ marginLeft: 10, padding: 6 }}
        >
          <option value="public">Public</option>
          <option value="friendsOnly">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={settings.showOnlineStatus}
          onChange={e => handleChange("showOnlineStatus", e.target.checked)}
        />{" "}
        Show online status to others
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={settings.allowSearchByEmail}
          onChange={e => handleChange("allowSearchByEmail", e.target.checked)}
        />{" "}
        Allow others to find me by email
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={settings.shareActivityStatus}
          onChange={e => handleChange("shareActivityStatus", e.target.checked)}
        />{" "}
        Share my activity status with friends
      </label>

      <button
        onClick={handleSave}
        style={{ marginTop: 20, padding: "10px 20px", fontSize: 16 }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default PrivacySettings;
