import React, { useEffect } from "react";
import "./Results.css";
import confetti from "canvas-confetti";

const Results = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const message =
    percentage === 100
      ? "Perfect Score! 🎯"
      : percentage >= 80
      ? "Great job! 💪"
      : percentage >= 50
      ? "Nice effort! 🙌"
      : "Keep practicing! 💡";

  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  return (
    <div className="results-container">
      <h1>Quiz Complete!</h1>
      <div className="score-circle">
        <span>{percentage}%</span>
      </div>
      <p className="results-message">{message}</p>
      <p>
        You scored {score} out of {total}
      </p>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default Results;
