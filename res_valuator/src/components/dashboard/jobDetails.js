import React from 'react';

const JobDetails = () => {

    const job = {
        jobId: 2,
        jobTitle: 'UI/UX Designer',
        status: 'Inactive',
        jobDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        jobUrl: 'https://example.com/job2',
        candidates: [
            { name: 'Alice Brown', email: 'alice@example.com', phone: '1111111111', status: 'Offer' },
            { name: 'Bob Johnson', email: 'bob@example.com', phone: '2222222222', status: 'Rejected' },
        ],
    }
    return (
        <div className="job-details">
            <h3>Job Details</h3>
            <p>{job.jobDesc}</p>
            <p>
                <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                    Job URL
                </a>
            </p>

            <h3>Candidates</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {job.candidates.map((candidate, index) => (
                        <tr key={index}>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.phone}</td>
                            <td>{candidate.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobDetails;
