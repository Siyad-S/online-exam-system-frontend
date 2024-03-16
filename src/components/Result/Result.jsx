import React, { useEffect, useState } from "react";
import "./Result.css";

const Result = () => {
  const [markNum, setMarkNum] = useState(null);
  const [correctedNum, setCorrectedNum] = useState(null);
  const [incorrectNum, setIncorrectNum] = useState(null);

  useEffect(() => {
    const mark = localStorage.getItem("mark");
    const corrected = localStorage.getItem("corrected");
    const incorrect = localStorage.getItem("incorrect");

    setMarkNum(mark);
    setCorrectedNum(corrected);
    setIncorrectNum(incorrect);
  }, []);

  return (
    <div className="result_body">
      <div className="success-message">
        <h2>Congratulations, you've completed the exam!</h2>
        <p>
          Your score: <span id="score">{markNum}</span>
        </p>
        <p style={{ color: "green" }}>
          Correct answers:{" "}
          <span id="correct-score">{correctedNum}</span>
        </p>
        <p style={{ color: "red" }}>
          Wrong answers: <span id="wrong-score">{incorrectNum}</span>
        </p>
        <p>You have successfully passed the exam.</p>
        <a href="/">Take Exam Again</a>
      </div>
    </div>
  );
};

export default Result;
