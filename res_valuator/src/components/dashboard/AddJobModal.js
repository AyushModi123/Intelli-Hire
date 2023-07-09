import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AddJobModal = ({ isOpen, setIsOpen }) => {
    const [formData, setFormData] = useState({
        jobDesc: '',
        education: '',
        experience: '',
        skills: '',
        projects: '',
        achievements: '',
        testScore: 0
    });

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
            <Modal>
                <div className="modal">
                    <div className="modal-content">
                        <h2>Job Application</h2>
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
                                type="text"
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="experience">Experience:</label>
                            <input
                                type="text"
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="skills">Skills:</label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="projects">Projects:</label>
                            <input
                                type="text"
                                id="projects"
                                name="projects"
                                value={formData.projects}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="achievements">Achievements:</label>
                            <input
                                type="text"
                                id="achievements"
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="testScore">Test Score:</label>
                            <input
                                type="range"
                                id="testScore"
                                name="testScore"
                                min="0"
                                max="5"
                                value={formData.testScore}
                                onChange={handleInputChange}
                            />
                            <span>{formData.testScore}</span>
                        </div>
                        <button onClick={toggleModal}>Close Modal</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddJobModal;
