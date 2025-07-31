import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function ProfilePage() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUser]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    await updateDoc(docRef, profileData);
    alert("Profile updated!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={profileData.displayName || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bio"
        placeholder="Bio"
        value={profileData.bio || ""}
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default ProfilePage;
