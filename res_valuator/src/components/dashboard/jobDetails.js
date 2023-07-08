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
        <div style={{marginLeft:'40px'}}>
            <h3 style={{ color: '#fff' }}>Job Details</h3>
            <p style={{ color: '#fff' }}>{job.jobDesc}</p>
            <p style={{ color: '#fff' }}>
                <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                    Job URL
                </a>
            </p>

            
            <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
            <h3 style={{ color: '#fff' }}>Candidates</h3>
                <table style={{ color: '#fff', width: '70%' }}>
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

        </div>
    );
};

export default JobDetails;
