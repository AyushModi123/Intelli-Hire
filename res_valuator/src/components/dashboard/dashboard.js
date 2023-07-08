// import React, { useEffect, useState } from "react";
// const Dashboard = () => {
//     const [data, setData] = useState({
//         jd: "",/*same names as in db*/
//         weights: [],
//         employer: "",
//         password1: "",
//         password2: "",
//       });
//       const handleChange = ({ currentTarget: input }) => {
//         setData({ ...data, [input.name]: input.value });
//       };  
//   return (
//     <div>
//       <h1 style={{color:"white"}}>Dashboard</h1>
//       <input
//        type="text"
//        placeholder="Enter JD"
//        name="jd"
//        value={data.jd}
//        onChange={handleChange} 
//       />
//     </div>
//   )
// }

// export default Dashboard
import React, { useEffect, useState } from 'react';

import './dashboard.css'; // Import the CSS file
import JobDetails from './jobDetails';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [jobs, setJobs] = useState([
    {
      jobId: 1,
      jobTitle: 'Software Engineer',
      status: 'Active',
      jobDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      jobUrl: 'https://example.com/job1',
      candidates: [
        { name: 'John Doe', email: 'john@example.com', phone: '1234567890', status: 'Applied' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', status: 'Interview' },
      ],
    },
    {
      jobId: 2,
      jobTitle: 'UI/UX Designer',
      status: 'Inactive',
      jobDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      jobUrl: 'https://example.com/job2',
      candidates: [
        { name: 'Alice Brown', email: 'alice@example.com', phone: '1111111111', status: 'Offer' },
        { name: 'Bob Johnson', email: 'bob@example.com', phone: '2222222222', status: 'Rejected' },
      ],
    },
  ]);

  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if(!token){
  //     navigate("/login");
  //   }
  // },[])
  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const handleEdit = (job) => {
    // Handle edit action for the job
    console.log('Edit job:', job);
  };

  const handleDelete = (job) => {
    // Handle delete action for the job
    console.log('Delete job:', job);
  };


  return (
    <div className="dashboard-container">
      <h2>Job Dashboard</h2>

      <div className="card-container">
        {jobs.map((job) => (
          <Link to={`/dashboard/${job.jobId}`}>
            <div className="card" key={job.jobId} onClick={() => handleCardClick(job)}>
              <h3>{job.jobTitle}</h3>
              <p>Job ID: {job.jobId}</p>
              <p>Status: {job.status}</p>
              <div className="actions">
                <button onClick={(e) => handleDelete(job)}>Delete</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

};

export default Dashboard;
