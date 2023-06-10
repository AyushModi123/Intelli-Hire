import React, { useEffect, useState } from "react";

const Result = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/result")
      .then((res) => res.json())
      .then((data) => {
        setScore(data.score);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <h2>Test Result</h2>
      {score !== null ? (
        <p>Your score: {score}</p>
      ) : (
        <p>Loading score...</p>
      )}
    </div>
  );
};

export default Result;
