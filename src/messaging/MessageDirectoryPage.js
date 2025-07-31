import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getConversationId } from '../utils/conversationId';
import { getLastRead } from '../utils/firestoreHelpers';

const currentUserId = 'cGTsloYaSXXwLGiiwSfZBLdinhk2';

const MessageDirectoryPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    const fetchUsersAndMessages = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.id !== currentUserId);

      setUsers(userList);

      const previews = {};
      const unread = {};

      for (const user of userList) {
        const convoId = getConversationId(currentUserId, user.id);
        const msgQuery = query(
          collection(db, 'conversations', convoId, 'messages'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );

        const msgSnapshot = await getDocs(msgQuery);
        if (!msgSnapshot.empty) {
          const lastMsg = msgSnapshot.docs[0].data();
          previews[user.id] = lastMsg.text;

          const lastRead = await getLastRead(convoId, currentUserId);
          const lastTimestamp = lastMsg.timestamp?.toMillis?.() || 0;

          if (lastTimestamp > lastRead) {
            unread[user.id] = true;
          }
        }
      }

      setLastMessages(previews);
      setUnreadCounts(unread);
    };

    fetchUsersAndMessages();
  }, []);

  const startConversation = (targetUserId) => {
    navigate(`/messages/${targetUserId}`);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Start a Chat</h2>
      <div style={styles.userList}>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => startConversation(user.id)}
            style={styles.userCard}
          >
            <img
              src={user.photoURL || 'https://via.placeholder.com/100'}
              alt={user.name || 'User'}
              style={styles.avatar}
            />
            <div style={{ flex: 1 }}>
              <p style={styles.userName}>
                {user.name || 'Unnamed User'}
                {unreadCounts[user.id] && (
                  <span style={styles.unreadDot}>•</span>
                )}
              </p>
              <p style={styles.preview}>{lastMessages[user.id] || 'No messages yet'}</p>
              <p style={styles.userId}>{user.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#1e2a38',
    color: '#fff',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '2rem',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  userCard: {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '350px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  userName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 0,
  },
  preview: {
    fontSize: '0.95rem',
    color: '#ccc',
    textAlign: 'left',
    margin: '0.3rem 0',
  },
  userId: {
    fontSize: '0.8rem',
    color: '#888',
    textAlign: 'left',
  },
  unreadDot: {
    color: '#ff5252',
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
    verticalAlign: 'middle',
  },
};

export default MessageDirectoryPage;
