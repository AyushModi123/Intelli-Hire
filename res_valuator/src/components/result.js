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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: "100vh",
        background: "white",
      }}
    >
      {score !== null ? (
        <main class="dashboard-container">
          <div class="dashboard">
            <h1 class="dashboard__header">Your Result</h1>
            <div class="dashboard__score">
              <h2 id="score-number" class="score-number">
                {score}
              </h2>
              <p class="score-text">of 10</p>
            </div>
            <div class="dashboard__grade">
              <h2 class="grade-text">Great</h2>
              <h3 class="grade-description">
                You scored higher than 65% of the people who have taken these
                tests.
              </h3>
            </div>
          </div>
          <div class="summary">
            <h1 class="summary__header">Summary</h1>
            <div id="summary__category"></div>
            <button class="continue" type="button">
              Continue
            </button>
          </div>
        </main>
      ) : (
        <div className="loader">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ff31a9" }}>
            Preparing Verdict...
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
