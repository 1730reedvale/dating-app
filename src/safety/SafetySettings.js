// src/safety/SafetySettings.js

import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const SafetySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuthEnabled: false,
    blockUnknownContacts: true,
    autoLogoutMinutes: 30,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!auth.currentUser) return;
      setLoading(true);
      const docRef = doc(db, "safetySettings", auth.currentUser.uid);
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
    const docRef = doc(db, "safetySettings", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, settings);
    } else {
      await setDoc(docRef, settings);
    }
    alert("Safety settings saved.");
  };

  if (loading) return <p>Loading safety settings...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Safety Settings</h2>

      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={settings.twoFactorAuthEnabled}
          onChange={e => handleChange("twoFactorAuthEnabled", e.target.checked)}
        />{" "}
        Enable two-factor authentication
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={settings.blockUnknownContacts}
          onChange={e => handleChange("blockUnknownContacts", e.target.checked)}
        />{" "}
        Automatically block messages from unknown users
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        Auto Logout After Inactivity (minutes):
        <input
          type="number"
          min={1}
          max={120}
          value={settings.autoLogoutMinutes}
          onChange={e => handleChange("autoLogoutMinutes", Number(e.target.value))}
          style={{ width: 80, marginLeft: 10, padding: 4 }}
        />
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

export default SafetySettings;
