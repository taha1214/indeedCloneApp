import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentHeader from '../../components/Header/studentHeader';
import { baseUrl } from '../../shared/constant';
import { useSelector } from 'react-redux';
// import JobCard from '../../components/jobCard';

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useSelector((s) => s.userReducer);
  const userId = user?._id;

  useEffect(() => {
    console.log("MyJobs component mounted");
    console.log("User ID:", userId);
    // Fetch applied jobs from the backend when the component loads
    const fetchAppliedJobs = async () => {
        if (!userId) {
          console.log("No User ID, skipping fetch");
          return;
        }
      
        try {
          console.log("Fetching jobs...");
          const response = await axios.get(`${baseUrl}/jobPost/GetAllJobs`);
          console.log("Fetched jobs:", response.data); // Log the entire response data
      
          // Check if response.data is an array
          if (!response.data.allJobs || !Array.isArray(response.data.allJobs)) {
            console.error("Expected an array of jobs but received:", response.data);
            return; // Early return if data is not an array
          }
      
          // Filter jobs based on applied users
          const userAppliedJobs = response.data.allJobs.filter(job => 
            job.applyUsers && job.applyUsers.includes(userId)
          );
      
          setAppliedJobs(userAppliedJobs);
          console.log("Applied jobs:", userAppliedJobs);
        } catch (error) {
          console.error('Error fetching applied jobs:', error.message);
        }
      };
      
    fetchAppliedJobs();
  }, [userId]); // Fetch when userId changes

  return (

   
    <div>
      <StudentHeader />
      <div className="my-jobs">
        <h2>My Applied Jobs</h2>
        <ul>
          {appliedJobs.map((appliedJob) => (
            <li key={appliedJob._id}>
              <h3>{appliedJob.title}</h3>
              <h4>{appliedJob.author?.name || null}</h4>
              <p>Applied on: {new Date(appliedJob.updatedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppliedJob;
