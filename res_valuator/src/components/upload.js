import React, {  useState } from "react";
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
          if (resume !== null) navigate("/quiz");
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <div class="nine" style={{ padding: "40px" }}>
        <h1>
          Find T
          <span>
            Making the process of finding talent simplier, efficient and quicker
          </span>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label for="images" class="drop-container">
          <span class="drop-title">Drop files here</span>
          or
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            required
          />
        </label>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "50px" }}
        >
          <button type="submit" className="submit-button">
            Upload Resume
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
