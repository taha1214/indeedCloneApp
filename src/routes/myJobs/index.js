import { useEffect, useState } from "react";
import { baseUrl } from "../../shared/constant";
import axios from "axios";
import { useSelector } from "react-redux";
import JobCard from "../../components/jobCard/index";
import CompanyHeader from "../../components/Header/companyHeader";

const MyJobs = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [jobs, setJobs] = useState([]);
  const [applyUsersDetails, setApplyUsersDetails] = useState({});
  const userId = user?._id;

  useEffect(() => {
    // Fetch all jobs
    axios
      .get(`${baseUrl}/jobPost/GetAllJobs`)
      .then((res) => {
        const data = res.data.allJobs;
        setJobs(data);
      })
      .catch((err) => {
        alert("Error fetching jobs", err);
      });
  }, []);

  // Filter jobs posted by the current user
  const usersJob = jobs.filter((job) => job?.author?._id === userId);

  // Extract applyUsers from jobs and fetch their details
  useEffect(() => {
    const fetchAppliedUsersDetails = async () => {
      // Get all unique applied user IDs from the jobs
      const allApplyUsers = usersJob.flatMap((job) => job.applyUsers || []);
      const uniqueUserIds = [...new Set(allApplyUsers)];

      if (uniqueUserIds.length > 0) {
        try {
          const response = await axios.post(`${baseUrl}/auth/getUsersByIds`, {
            userIds: uniqueUserIds,
          });

          const usersMap = response.data.reduce((acc, user) => {
            acc[user._id] = user; // Map userId to user details
            return acc;
          }, {});

          setApplyUsersDetails(usersMap);
          console.log("applyUsersDetails", applyUsersDetails) // Set fetched user details
        } catch (err) {
          console.error("Error fetching applied user details", err);
        }
      }
    };

    if (usersJob.length > 0) {
      fetchAppliedUsersDetails();
    }
  }, [usersJob, applyUsersDetails]);

  return (
    <div>
      <CompanyHeader />
      <div className="blog-list">
        {usersJob.length > 0 ? (
          usersJob.map((job) => (
            <div key={job?._id}>
              <JobCard job={job} />
              {/* List the users who applied */}
              <h4>Applied Users:</h4>
              <ul>
                {Array.isArray(job.applyUsers) && job.applyUsers.length > 0 ? (
                  job.applyUsers.map((userId) => (
                    <li key={userId}>
                      {applyUsersDetails?.email || "Email not available"} - 
                      {applyUsersDetails?.name || "Name not available"}
                    </li>
                  ))
                ) : (
                  <li>No users have applied yet.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <h3>No jobs yet</h3>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
