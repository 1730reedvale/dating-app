import React from "react";

const OnboardingStep15 = ({ profile, onEdit, onSubmit }) => {
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20 }}>
      <h2>Review Your Profile</h2>

      <div style={{ marginBottom: 10 }}>
        <strong>Display Name:</strong> {profile.displayName || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Age:</strong> {profile.age || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Location:</strong> {profile.location || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Height:</strong> {profile.height || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Body Type:</strong> {profile.bodyType || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Relationship Type:</strong> {profile.relationshipType || "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Interests:</strong> {profile.interests && profile.interests.length > 0 ? profile.interests.join(", ") : "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Preferred Age Range:</strong> {profile.preferredAgeRange ? `${profile.preferredAgeRange[0]} - ${profile.preferredAgeRange[1]}` : "-"}
      </div>
      <div style={{ marginBottom: 10 }}>
        <strong>Preferred Distance:</strong> {profile.preferredDistance ? `${profile.preferredDistance} miles` : "-"}
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={onEdit}
          style={{ marginRight: 15, padding: "10px 20px", fontSize: 16 }}
        >
          Edit Info
        </button>
        <button
          onClick={onSubmit}
          style={{ padding: "10px 20px", fontSize: 16 }}
        >
          Submit Profile
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep15;
