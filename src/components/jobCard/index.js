import React from 'react';
import { Button, Card } from 'antd';
import moment from "moment";
import "./index.css";
import axios from 'axios';
import { baseUrl } from '../../shared/constant';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const JobCard = ({ job } ) => {
  const { user } = useSelector((s) => s.userReducer);
//  const navigate = useNavigate();
  const userId = user?._id
  // const { job } = props; // Destructure job from props

  const applyForJob = async (jobId, userId) => {
    try {
      await axios.post(`${baseUrl}/jobPost/updateJobs/${jobId}`, {
        userId: userId, // Send userId in the request body
      });
      alert("Job application successful!");
    } catch (err) {
      alert("Failed to apply for the job.");
      console.error(err);
    }
  };

  return (
    
    <div>
      <Card
        title={job.title}
        bordered={false}
        style={{
          width: 300,
          backgroundColor: '#32a4a8',
        }}
      >
        <h2>Description</h2>
        <p>{job.description}</p>
        <h2>Requirements</h2>
        <p>{job.requirements}</p>
        <div className='card'>
          <img
            className='profile-image'
            alt="profile"
            src={job?.author?.profile || "/user-icon.png"} // Default image if none provided
          />
          &nbsp;&nbsp;&nbsp;&nbsp;<span>{job?.author?.name || "user"}</span>
        </div>
        {job?.author?._id !== userId ? (
        <Button type='primary' onClick={() => applyForJob(job?._id, userId)}>Apply</Button>
        ) : (null)}
        <p>{moment(job.createdAt).fromNow()}</p>
      </Card>
    </div>  );
};

export default JobCard;


// {/* <div className="creator-profile">
//         <img alt="profile" src={job?.author?.profile || "/user-icon.png"} />
//         <div>
//           <p className="creator-name">{job?.author?.name}</p>
//           <p className="created-at">{moment(job.createdAt).fromNow()}</p>
//         </div>
//       </div> */}