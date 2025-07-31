import React from "react";
import { useAuth } from "../auth/AuthContext";
import DateStorySharing from "./DateStorySharing";

const CommunityPage = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>Community: Share Your Date Stories</h2>
      {currentUser ? (
        <DateStorySharing userId={currentUser.uid} />
      ) : (
        <p>Please log in to share your story!</p>
      )}
      {/* You could add a list of recent stories here later */}
    </div>
  );
};

export default CommunityPage;
