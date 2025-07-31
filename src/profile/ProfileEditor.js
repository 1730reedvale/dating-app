import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SPORTS_OPTIONS = [
  "Soccer", "Basketball", "Tennis", "Baseball", "Running",
  "Swimming", "Cycling", "Yoga", "Golf", "Hiking",
  "Skiing", "Skateboarding", "Martial Arts", "Volleyball",
  "Gymnastics", "CrossFit", "Dance", "Climbing", "Surfing"
];

const INTERESTS_OPTIONS = [
  "Travel", "Music", "Reading", "Movies", "Cooking",
  "Technology", "Gaming", "Art", "Photography", "Volunteering",
  "Fitness", "Pets", "Gardening", "Writing", "Meditation",
  "Fashion", "Politics", "Science", "Crafts", "Theater"
];

const ProfileEditor = ({ profile }) => {
  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    location: "",
    lifestyle: "",
    height: "",
    bodyType: "",
    hairColor: "",
    job: "",
    relationshipType: "",
    educationLevel: "",
    smokingHabit: "",
    drinkingHabit: "",
    pets: "",
    languagesSpoken: [],
    hobbies: [],
    interests: [],
    aboutMe: "",
    lookingFor: "",
    photoURL: ""
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm(prev => ({ ...prev, ...profile }));
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, option) => {
    setForm(prev => {
      const currentArr = prev[field] || [];
      if (currentArr.includes(option)) {
        return { ...prev, [field]: currentArr.filter(i => i !== option) };
      } else {
        return { ...prev, [field]: [...currentArr, option] };
      }
    });
  };

  const handleFileChange = async (e) => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    const storageRef = ref(storage, `profilePhotos/${auth.currentUser.uid}/${file.name}`);
    setUploading(true);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setForm(prev => ({ ...prev, photoURL: url }));
        setUploading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(docRef, form, { merge: true });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Error saving profile. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "20px auto" }}>
      <h2>Edit Your Profile</h2>

      <label>
        Display Name:
        <input
          type="text"
          value={form.displayName}
          onChange={e => handleChange("displayName", e.target.value)}
          required
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      <label>
        Profile Photo:
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p>Uploading: {uploadProgress.toFixed(0)}%</p>}
        {form.photoURL && (
          <img
            src={form.photoURL}
            alt="Profile preview"
            style={{ width: 120, height: 120, borderRadius: "50%", marginTop: 8 }}
          />
        )}
      </label>

      <label>
        Bio:
        <textarea
          value={form.bio}
          onChange={e => handleChange("bio", e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
          placeholder="Short description about yourself"
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          value={form.location}
          onChange={e => handleChange("location", e.target.value)}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
          placeholder="City, State or Region"
        />
      </label>

      {/* Lifestyle */}
      <label>
        Lifestyle:
        <input
          type="text"
          value={form.lifestyle}
          onChange={e => handleChange("lifestyle", e.target.value)}
          placeholder="e.g., Active, Outdoorsy"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Height */}
      <label>
        Height:
        <input
          type="text"
          value={form.height}
          onChange={e => handleChange("height", e.target.value)}
          placeholder={`e.g., 5'8"`}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Body Type */}
      <label>
        Body Type:
        <input
          type="text"
          value={form.bodyType}
          onChange={e => handleChange("bodyType", e.target.value)}
          placeholder="e.g., Athletic, Slim, Average"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Hair Color */}
      <label>
        Hair Color:
        <input
          type="text"
          value={form.hairColor}
          onChange={e => handleChange("hairColor", e.target.value)}
          placeholder="e.g., Brown, Blonde, Black"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Job */}
      <label>
        Job:
        <input
          type="text"
          value={form.job}
          onChange={e => handleChange("job", e.target.value)}
          placeholder="Your occupation"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Relationship Type */}
      <label>
        Relationship Type Sought:
        <input
          type="text"
          value={form.relationshipType}
          onChange={e => handleChange("relationshipType", e.target.value)}
          placeholder="e.g., Long-term, Casual"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Education Level */}
      <label>
        Education Level:
        <input
          type="text"
          value={form.educationLevel}
          onChange={e => handleChange("educationLevel", e.target.value)}
          placeholder="e.g., College, Graduate"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Smoking Habit */}
      <label>
        Smoking Habit:
        <input
          type="text"
          value={form.smokingHabit}
          onChange={e => handleChange("smokingHabit", e.target.value)}
          placeholder="e.g., Non-smoker, Occasionally"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Drinking Habit */}
      <label>
        Drinking Habit:
        <input
          type="text"
          value={form.drinkingHabit}
          onChange={e => handleChange("drinkingHabit", e.target.value)}
          placeholder="e.g., Socially, Never"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Pets */}
      <label>
        Pets:
        <input
          type="text"
          value={form.pets}
          onChange={e => handleChange("pets", e.target.value)}
          placeholder="e.g., Dog, Cat, None"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Languages Spoken */}
      <label>
        Languages Spoken (comma separated):
        <input
          type="text"
          value={form.languagesSpoken.join(", ")}
          onChange={e => handleChange("languagesSpoken", e.target.value.split(",").map(s => s.trim()))}
          placeholder="English, Spanish, French"
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
        />
      </label>

      {/* Hobbies */}
      <fieldset style={{ marginBottom: 20 }}>
        <legend><strong>Sports Hobbies (check all that apply):</strong></legend>
        {SPORTS_OPTIONS.map(option => (
          <label key={option} style={{ marginRight: 12, display: "inline-block", marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={form.hobbies.includes(option)}
              onChange={() => handleCheckboxChange("hobbies", option)}
            /> {option}
          </label>
        ))}
      </fieldset>

      {/* Interests */}
      <fieldset style={{ marginBottom: 20 }}>
        <legend><strong>Other Interests (check all that apply):</strong></legend>
        {INTERESTS_OPTIONS.map(option => (
          <label key={option} style={{ marginRight: 12, display: "inline-block", marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={form.interests.includes(option)}
              onChange={() => handleCheckboxChange("interests", option)}
            /> {option}
          </label>
        ))}
      </fieldset>

      {/* About Me */}
      <label>
        About Me:
        <textarea
          value={form.aboutMe}
          onChange={e => handleChange("aboutMe", e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
          placeholder="Write a bit about yourself"
        />
      </label>

      {/* What I'm Looking For */}
      <label>
        What I'm Looking For:
        <textarea
          value={form.lookingFor}
          onChange={e => handleChange("lookingFor", e.target.value)}
          rows={4}
          style={{ width: "100%", padding: 8, margin: "6px 0 12px" }}
          placeholder="Describe qualities or interests you seek"
        />
      </label>

      <button type="submit" style={{ padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>
        Save Profile
      </button>
    </form>
  );
};

export default ProfileEditor;
