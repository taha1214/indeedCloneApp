import { useEffect, useState } from "react";
import JobCard from "../../../components/jobCard/index";
import axios from "axios";
import { baseUrl }from "../../../shared/constant"
// import { useSelector } from "react-redux";


const JobList = () => {
  const [jobs, setJobs] = useState([])
  // const { user } = useSelector((s) => s.userReducer);

  // const userId = user?.id

  useEffect(() =>{

    axios
    .get(`${baseUrl}/jobPost/getAllJobs`)
    .then((res) =>{

      console.log("jobs ",res)

      const data = res.data.allJobs;

      setJobs(Array.isArray(data) ? data : [])

    //  alert("blog", data)     
    })
    .catch((err) => {
      alert("err", err);
    })
    },[])

  return (
    <div className="blog-list">
      {jobs.length ? (
        jobs.map((job) => <JobCard job={job} />)
      ) : (
        <h3>No Jobs Yet</h3>
      )}
    </div>
  );
};

export default JobList;
