import React, { useEffect, useState } from 'react'
import JobDescriptionCard from './card'
import BasicTable from './table'

const MainCandidatepage = () => {
  const [details, setDetails] = useState('');

  const url = window.location.href;
  const j_id = url.split('/').pop();

  useEffect(() => {
    
    fetch(`http://127.0.0.1:5001/job/${j_id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDetails(data)
        // setJobs(data.data);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <JobDescriptionCard details={details}/>
      <BasicTable details={details}/>
    </div>
  )
}

export default MainCandidatepage
