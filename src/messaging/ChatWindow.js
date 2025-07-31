import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const ChatWindow = ({ otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!auth.currentUser || !otherUserId) return;

    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMessages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Filter messages between current user and otherUserId only
        if (
          data.participants.includes(otherUserId) &&
          data.participants.includes(auth.currentUser.uid)
        ) {
          allMessages.push({ id: doc.id, ...data });
        }
      });
      setMessages(allMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [otherUserId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      text: input.trim(),
      senderId: auth.currentUser.uid,
      participants: [auth.currentUser.uid, otherUserId],
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          marginBottom: 12,
          padding: 10,
          backgroundColor: "#f9f9f9",
          borderRadius: 4,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: 10,
              textAlign: msg.senderId === auth.currentUser.uid ? "right" : "left",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 20,
                backgroundColor: msg.senderId === auth.currentUser.uid ? "#0084ff" : "#e5e5ea",
                color: msg.senderId === auth.currentUser.uid ? "white" : "black",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "100%", padding: 10, borderRadius: 20, border: "1px solid #ccc" }}
        />
      </form>
    </div>
  );
};

export default ChatWindow;

