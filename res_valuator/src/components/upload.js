import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleResumeUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setResume(uploadedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server if needed
          console.log(data);

          // Redirect to "/quiz" route
          if(resume!==null)
             navigate("/quiz");
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <h2>Resume Uploader</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
        <button type="submit">Upload Resume</button>
      </form>
    </div>
  );
}

export default Upload;
