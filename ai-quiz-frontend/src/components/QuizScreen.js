import React, { useState, useEffect } from "react";
import "./QuizScreen.css";

const QuizScreen = ({ question, current, total, handleAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const handleClick = (opt) => {
    if (locked) return;
    setSelected(opt);
    setLocked(true);
    setTimeout(() => {
      handleAnswer(opt);
      setSelected(null);
      setLocked(false);
    }, 1000); // 1 second delay
  };

  const getButtonClass = (opt) => {
    if (!locked) return "";
    if (opt === question.correct) return "correct";
    if (opt === selected && opt !== question.correct) return "incorrect";
    return "";
  };

  return (
    <div className="quiz-container">
      <h2>
        Question {current + 1} of {total}
      </h2>
      <p className="quiz-question">{question.question}</p>
      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleClick(opt)}
            className={getButtonClass(opt)}
            disabled={locked}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
