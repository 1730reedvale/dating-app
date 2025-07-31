import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const LocationSetter = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      const formattedAddress = data.results[0].formatted_address;
      return { location, formattedAddress };
    } else {
      throw new Error("Geocoding failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const { location, formattedAddress } = await geocodeAddress(address);
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        location: formattedAddress,
        coords: {
          latitude: location.lat,
          longitude: location.lng,
        },
      });
      setMessage("Location saved successfully!");
      setAddress("");
    } catch (err) {
      setMessage("Failed to save location. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "20px auto" }}>
      <label style={{ display: "block", marginBottom: 8 }}>
        Enter your address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, State"
          style={{ width: "100%", padding: 10, marginTop: 4, borderRadius: 6, border: "1px solid #ccc" }}
          required
          disabled={loading}
        />
      </label>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: 12,
          backgroundColor: "#1a237e",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        {loading ? "Saving..." : "Save Location"}
      </button>
    </form>
  );
};

export default LocationSetter;
