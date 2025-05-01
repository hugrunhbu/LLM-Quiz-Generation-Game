import React, { useState, useEffect } from "react";
import "./QuizScreen.css";

const ching = new Audio("/ching.mp3");
const eghh = new Audio("/eghh.mp3");

const QuizScreen = ({ question, current, total, handleAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    setTimeLeft(15); // reset timer on new questions
    setSelected(null);
    setLocked(false);
  }, [question]);

  useEffect(() => {
    if (locked) return;

    if (timeLeft === 0) {
      setLocked(true);
      eghh.play();
      setTimeout(() => handleAnswer(null), 1000);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, locked, handleAnswer]);

  const handleClick = (opt) => {
    if (locked) return;
    setSelected(opt);
    setLocked(true);

    if (opt === question.correct) {
      ching.play();
    } else {
      eghh.play();
    }

    setTimeout(() => {
      handleAnswer(opt);
    }, 2000); // 2 second delay
  };

  const getButtonClass = (opt) => {
    if (!locked) return "";
    if (opt === question.correct) return "correct";
    if (opt === selected && opt !== question.correct) return "incorrect";
    return "";
  };

  return (
    <div className="quiz-screen-wrapper">
      <div className="quiz-container">
        <h2>
          Question {current + 1} of {total}
        </h2>
        <p className="quiz-question">{question.question}</p>
        <div className="timer">Time Left: {timeLeft}s</div>
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
    </div>
  );
};

export default QuizScreen;
