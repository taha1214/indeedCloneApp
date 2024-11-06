// src/components/CompanyList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import AdminHeader from "../../components/Header/adminHeader";
import UserCard from "../../components/UserCard";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate()

  // Fetch all users from the backend
  useEffect(() => {
    axios
      .get(`${baseUrl}/auth/getAllUsers`)
      .then((response) => {
        const allUsers = response.data;
        // Filter for companies
        const companyUsers = allUsers.filter(user => user.category === "company");
        setCompanies(companyUsers); // Set companies in state
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
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
      navigate("/company-list")
      // Optionally refresh the user list here
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
};





  return (
    <div>
      <AdminHeader /> 
    <div>
      <h2>All Companies</h2>
      <ul className="list">
        {companies.length > 0 ? (
          companies.map((company) => (
            // <li key={company._id}>{company.name} ({company.email})</li>
            <li><UserCard data={company} />
            <Button type='primary' onClick={() => handleDelete(company._id)}>delete</Button>
            </li>

            
          ))
        ) : (
          <p>No companies found</p>
        )}
      </ul>
    </div>
    </div>
  );
};

export default CompanyList;
