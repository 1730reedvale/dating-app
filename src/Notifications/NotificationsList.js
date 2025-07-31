// src/notifications/NotificationsList.js

import React, { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "./NotificationService";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const notifs = await getNotifications();
      setNotifications(notifs);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  if (loading) return <p>Loading notifications...</p>;
  if (!notifications.length) return <p>No notifications.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Notifications</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map(({ id, message, createdAt, read }) => (
          <li
            key={id}
            style={{
              backgroundColor: read ? "#eee" : "#c6f7e2",
              padding: 12,
              marginBottom: 8,
              borderRadius: 6,
              cursor: read ? "default" : "pointer",
            }}
            onClick={() => !read && handleMarkRead(id)}
          >
            <div>{message}</div>
            <small style={{ color: "#555" }}>
              {new Date(createdAt.seconds * 1000).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsList;
