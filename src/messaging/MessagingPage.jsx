// /src/messaging/MessagingPage.jsx
import React, { useState } from 'react';
import './MessagingPage.css';

const conversations = [
  { name: 'Alex', lastMessage: 'Let’s meet Friday?', id: 1 },
  { name: 'Jordan', lastMessage: 'You there?', id: 2 },
  { name: 'Taylor', lastMessage: 'Haha, that was funny 😂', id: 3 },
  { name: 'Morgan', lastMessage: 'Sounds good to me!', id: 4 },
];

const MessagingPage = () => {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Placeholder for sending logic
    setMessage('');
  };

  return (
    <div className="messaging-page">
      <div className="conversation-list">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`conversation-item ${activeChat.id === conv.id ? 'active' : ''}`}
            onClick={() => setActiveChat(conv)}
          >
            <h4>{conv.name}</h4>
            <p>{conv.lastMessage}</p>
          </div>
        ))}
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <h3>{activeChat.name}</h3>
        </div>
        <div className="chat-body">
          <p className="chat-bubble received">{activeChat.lastMessage}</p>
          <p className="chat-bubble sent">Looking forward to it!</p>
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
