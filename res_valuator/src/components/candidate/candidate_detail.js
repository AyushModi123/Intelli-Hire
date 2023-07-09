import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./candidate_detail.css";
import CandidateJobDescriptionCard from './candidate-card/candidatejd';

const ApplicantDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('');
  const [job_desc,setjobdes]=useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/job/${id}/details`);

        setJobTitle(response.data.job_title);
        setStatus(response.data.status);
        setjobdes(response.data.jd);
        console.log(response.data.job_title);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: name,
        email: email,
        phone: phone,
      };

      const response = await axios.post(`http://127.0.0.1:5000/job/${id}/details`, data);

      navigate('/upload');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CandidateJobDescriptionCard job_desc={job_desc} jobTitle={jobTitle}/>
      <h1 style={{ color: "white", paddingTop: "60px" }}>Applicant Details</h1>
      <div>
        <p>Job Title: {jobTitle}</p>
        <p>Status: {status}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required /><br /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ApplicantDetails;
