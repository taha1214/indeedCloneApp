// src/components/UserList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import AdminHeader from "../../components/Header/adminHeader";
import UserCard from "../../components/UserCard";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  // Fetch all users from the backend
  useEffect(() => {
    axios
      .get(`${baseUrl}/auth/getAllUsers`)
      .then((response) => {
        const allUsers = response.data;
        // Filter for regular users
        const regularUsers = allUsers.filter(user => user.category === "user");
        setUsers(regularUsers); // Set regular users in state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://localhost:3000/auth/deleteUser/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User deleted:', data);
        navigate("/user-list");
        // Optionally refresh the user list here
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  return (
    <div>
      <AdminHeader />
    <div >
      <h2>All Regular Users</h2>
      <ul className="list">
        {users.length > 0 ? (
          users.map((user) => (
            // <li key={user._id}>{user.name} ({user.email})</li>
            <li><UserCard data={user} />
            <Button type='primary' onClick={() => handleDelete(user._id)}>delete</Button>
             </li>



          ))
        ) : (
          <p>No regular users found</p>
        )}
      </ul>
    </div>
    </div>
  );
};

export default UserList;
