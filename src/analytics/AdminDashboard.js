
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const toggleShadowban = async (userId, currentStatus) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { shadowbanned: !currentStatus });
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, shadowbanned: !currentStatus } : user
      )
    );
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Display Name</th>
            <th>Shadowbanned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.displayName}</td>
              <td>{user.shadowbanned ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => toggleShadowban(user.id, user.shadowbanned)}>
                  {user.shadowbanned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
