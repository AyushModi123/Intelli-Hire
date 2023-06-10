import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        console.log(data);
      });
  }, []);

  const handleAnswerSelection = (questionId, selectedChoice) => {
    const question = questions.find((q) => q._id === questionId);
    if (question && question.answer === selectedChoice) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleSubmit = () => {
    const scoreData = { score };

    fetch("http://127.0.0.1:5000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);

        navigate("/result");
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>{question.question}</h3>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={choice}
                  name={question._id}
                  value={choice}
                  onChange={() => handleAnswerSelection(question._id, choice)}
                />
                <label htmlFor={choice}>{choice}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Quiz;
