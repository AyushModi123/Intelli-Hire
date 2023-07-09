import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

const AddJobModal = ({ isOpen, setIsOpen }) => {
    const [flag, setFlag] = useState(false);
    const [jobId, setJobId] = useState('');

    const initialState = {
        job_title: '',
        jobDesc: '',
        education: '',
        experience: '',
        skills: '',
        projects: '',
        achievements: '',
        coding_profiles: '',
        testScore: '',
    }
    const [formData, setFormData] = useState(initialState);

    // Create a new FormData object to store the form data
    const handleSubmit = async (event) => {
        event.preventDefault();

        const r_id = localStorage.getItem("r_id");

        const data = {
            job_title: formData.job_title, jd: formData.jobDesc, weights: [
                formData.education / 10,
                formData.experience / 10,
                formData.skills / 10,
                formData.projects / 10,
                formData.achievements / 10,
                formData.coding_profiles / 10,
                formData.testScore / 10
            ],
            status: 'Active', r_id
        }
        console.log(data);
        const url = `http://127.0.0.1:5001/dashboard/${r_id}`;
        const res = await axios.post(url, data);
        console.log(res.status);
        if (res.status === 200) {
            setFlag(true);
            setJobId(res.data);
            setFormData(initialState);
        }
    };

    // Rest of your component code...

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="modal">
                    {flag ?
                        (
                            <>
                                <h1>Job has been successfully posted. Share the following link with the candidates for hiring!!!</h1>
                                <a href={`http://localhost:3000/job/${jobId}`}>http://localhost:3000/job/{jobId}</a>

                            </>
                        ) :
                        (
                            <div className="modal-content">
                                <h2>Job Application</h2>
                                <div className="form-group">
                                    <label htmlFor="jobDesc">Job Title:</label>
                                    <textarea
                                        id="job_title"
                                        name="job_title"
                                        value={formData.job_title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="jobDesc">Job Description:</label>
                                    <textarea
                                        id="jobDesc"
                                        name="jobDesc"
                                        value={formData.jobDesc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="education">Education:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="education"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.education}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="experience">Experience:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.experience}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="skills">Skills:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="skills"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.skills}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="projects">Projects:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="projects"
                                        name="projects"
                                        value={formData.projects}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.projects}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="achievements">Achievements:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="achievements"
                                        name="achievements"
                                        value={formData.achievements}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.achievements}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="projects">Coding Profiles:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        id="coding_profiles"
                                        name="coding_profiles"
                                        value={formData.coding_profiles}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.coding_profiles}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="testScore">Test Score:</label>
                                    <input
                                        type="range"
                                        id="testScore"
                                        name="testScore"
                                        min="0"
                                        max="10"
                                        value={formData.testScore}
                                        onChange={handleInputChange}
                                    />
                                    <span>{formData.testScore}</span>
                                </div>
                                <button onClick={handleSubmit}>Submit</button>
                            </div>)}
                </div>
            </Modal>
        </div>
    );
};

export default AddJobModal;
