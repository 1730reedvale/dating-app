import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convos = [];
      querySnapshot.forEach((doc) => {
        convos.push({ id: doc.id, ...doc.data() });
      });
      setConversations(convos);
    });

    return () => unsubscribe();
  }, []);

  const openConversation = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20 }}>
      <h2>Your Conversations</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {conversations.map((convo) => (
            <li
              key={convo.id}
              onClick={() => openConversation(convo.id)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              <strong>Conversation ID:</strong> {convo.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationsList;
