// /src/video/VideoChatPage.js

import React, { useRef } from "react";
import "./VideoChatPage.css";

function VideoChatPage() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const startCall = () => {
    alert("Starting video call (placeholder)");
    // In production: connect to signaling server or WebRTC library
  };

  const endCall = () => {
    alert("Ending call (placeholder)");
    // In production: close streams and cleanup
  };

  return (
    <div className="video-chat-page">
      <h2>Video Chat</h2>
      <div className="video-container">
        <video className="video-player" ref={localVideoRef} autoPlay muted />
        <video className="video-player" ref={remoteVideoRef} autoPlay />
      </div>
      <div className="video-controls">
        <button onClick={startCall}>Start Call</button>
        <button onClick={endCall}>End Call</button>
      </div>
    </div>
  );
}

export default VideoChatPage;
