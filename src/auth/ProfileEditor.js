
// src/profile/ProfileEditor.js

import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const hobbiesOptions = [
  "Travel",
  "Reading",
  "Sports",
  "Cooking",
  "Music",
  "Art",
  "Fitness",
  "Gaming",
  "Movies",
  "Dancing",
  "Hiking",
  "Photography",
  "Yoga",
  "Meditation",
  "Gardening",
  "Writing",
  "Volunteering",
  "Technology",
  "Fashion",
  "Pets",
];

const interestsOptions = [
  "Technology",
  "Environment",
  "Politics",
  "Culture",
  "Science",
  "History",
  "Business",
  "Health",
  "Animals",
  "Education",
  "Philosophy",
  "Sports",
  "Travel",
  "Music",
  "Art",
  "Fitness",
  "Food",
];

const ProfileEditor = ({ profile }) => {
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    lifestyle: profile?.lifestyle || "",
    height: profile?.height || "",
    bodyType: profile?.bodyType || "",
    hairColor: profile?.hairColor || "",
    job: profile?.job || "",
    relationshipType: profile?.relationshipType || "",
    educationLevel: profile?.educationLevel || "",
    smokingHabit: profile?.smokingHabit || "",
    drinkingHabit: profile?.drinkingHabit || "",
    pets: profile?.pets || "",
    languagesSpoken: profile?.languagesSpoken || [],
    hobbies: profile?.hobbies || [],
    interests: profile?.interests || [],
    aboutMe: profile?.aboutMe || "",
    lookingFor: profile?.lookingFor || "",
    photoURL: profile?.photoURL || "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return {
          ...prev,
          [field]: current.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [field]: [...current, value],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleChange("photoURL", downloadURL);
          setUploadProgress(0);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, formData, { merge: true });
      alert("Profile saved successfully!");
    } catch (error) {
      alert("Error saving profile: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "auto" }}>
      <h2>Edit Profile</h2>

      <label>
        Display Name:
        <input
          type="text"
          value={formData.displayName}
          onChange={(e) => handleChange("displayName", e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      <label>
        Bio:
        <textarea
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      {/* Add other text fields similarly: lifestyle, height, bodyType, hairColor, job, etc. */}

      <label>
        Profile Photo:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
      {uploadError && <p style={{ color: "red" }}>Error: {uploadError}</p>}

      <fieldset style={{ marginTop: 20 }}>
        <legend>Hobbies</legend>
        {hobbiesOptions.map((hobby) => (
          <label key={hobby} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={formData.hobbies.includes(hobby)}
              onChange={() => handleCheckboxChange("hobbies", hobby)}
            />
            {hobby}
          </label>
        ))}
      </fieldset>

      <fieldset style={{ marginTop: 20 }}>
        <legend>Interests</legend>
        {interestsOptions.map((interest) => (
          <label key={interest} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={formData.interests.includes(interest)}
              onChange={() => handleCheckboxChange("interests", interest)}
            />
            {interest}
          </label>
        ))}
      </fieldset>

      <label style={{ marginTop: 20 }}>
        About Me:
        <textarea
          value={formData.aboutMe}
          onChange={(e) => handleChange("aboutMe", e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      <label>
        What I'm Looking For:
        <textarea
          value={formData.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
        />
      </label>

      <button type="submit" style={{ padding: 12, width: "100%", marginTop: 20 }}>
        Save Profile
      </button>
    </form>
  );
};

export default ProfileEditor;
