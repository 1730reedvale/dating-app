
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { sendMessage, subscribeToMessages } from "./ChatService";

const ChatRoom = ({ chatId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    const unsubscribe = subscribeToMessages(chatId, setMessages);
    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(chatId, currentUser.uid, input);
    setInput("");
  };

  return (
    <div style={{
      maxWidth: 480,
      margin: "40px auto",
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      background: "#fafbfc"
    }}>
      <h2>Chat Room</h2>
      <div style={{
        minHeight: 200,
        maxHeight: 300,
        overflowY: "auto",
        marginBottom: 12,
        padding: 8,
        background: "#fff",
        borderRadius: 6,
        border: "1px solid #eee"
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            textAlign: msg.senderId === currentUser.uid ? "right" : "left",
            marginBottom: 6
          }}>
            <span
              style={{
                display: "inline-block",
                background: msg.senderId === currentUser.uid ? "#d1e7dd" : "#e7eaf6",
                padding: "8px 12px",
                borderRadius: 12,
                maxWidth: "75%",
                wordBreak: "break-word"
              }}
            >
              {msg.message}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: 6,
          background: "#007bff",
          color: "#fff",
          fontWeight: "bold"
        }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
