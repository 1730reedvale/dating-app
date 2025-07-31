// /src/online/OnlinePage.js

import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import "./OnlinePage.css";

function OnlinePage() {
  const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const onlineQuery = query(usersRef, where("isOnline", "==", true));

    const unsubscribe = onSnapshot(onlineQuery, (snapshot) => {
      const users = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser?.uid);
      setOnlineUsers(users);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleMessage = (userId) => {
    window.location.href = `/messages?userId=${userId}`;
  };

  const handleVideoChat = (userId) => {
    window.location.href = `/video?userId=${userId}`;
  };

  return (
    <div className="online-page">
      <h2>Who's Online</h2>
      <div className="online-list">
        {onlineUsers.map((user) => (
          <div key={user.id} className="online-card">
            <div className="online-name">{user.name || "Unknown User"}</div>
            <div className="online-actions">
              <button onClick={() => handleMessage(user.id)}>Message</button>
              <button onClick={() => handleVideoChat(user.id)}>Video Chat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlinePage;
