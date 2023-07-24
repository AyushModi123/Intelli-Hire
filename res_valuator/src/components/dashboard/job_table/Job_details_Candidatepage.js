import React, { useEffect, useState } from "react";
import JobDescriptionCard from "./card";
import BasicTable from "./table";
import { useNavigate } from "react-router-dom";

const JobDetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [notErrFetching, setNotErrFetching] = useState(false);
  const navigate = useNavigate();

  const url = window.location.href;
  const j_id = url.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://intelli-hire-recruiter-backend.onrender.com/job/${j_id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();
        setDetails(data);
        setNotErrFetching(true);
      } catch (error) {
        console.error("Error:", error);
        navigate("/unknown-territory");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {notErrFetching && (
        <div>
          <JobDescriptionCard details={details} j_id={j_id} />
          <BasicTable details={details} />
        </div>
      )}
    </>
  );
};

export default JobDetailsPage;
