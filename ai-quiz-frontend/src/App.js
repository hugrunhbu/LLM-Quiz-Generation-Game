import React, { useState } from "react";
import GeneratingScreen from "./components/GeneratingScreen";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";

function App() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [phase, setPhase] = useState("home"); // "home" "loading" "quiz" "done"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhase("loading"); // go to generating screen

    try {
      const res = await fetch("/generate_quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, numQuestions: 10 }),
      });

      const data = await res.json();
      console.log("Fetched data:", data);

      if (!data.questions || data.questions.length === 0) {
        alert(
          "No valid questions were returned. Please try a different topic."
        );
        setPhase("home");
        return;
      }

      setQuestions(data.questions);
      setCurrent(0);
      setScore(0);
      setShowScore(false);
      setPhase("quiz"); // once quiz is loaded, go to the quiz
    } catch (error) {
      console.error("Failed to fetch questions", error);
      setPhase("home"); // fallback in case of failure
      alert("Failed to generate quiz. Try again.");
    }
  };

  const handleAnswer = (selected) => {
    if (selected === questions[current].correct) {
      setScore(score + 1);
    }
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
    }
  };

  // ----- START RENDER -------

  if (phase === "loading") {
    return <GeneratingScreen />;
  }

  if (phase === "home") {
    return (
      <HomeScreen
        topic={topic}
        setTopic={setTopic}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (phase === "quiz") {
    if (questions.length === 0) {
      return <div>Loading quiz...</div>;
    }
    if (showScore) {
      return (
        <div style={{ padding: "20px" }}>
          <h1>Quiz Complete!</h1>
          <p>
            Your score: {score}/{questions.length}
          </p>
          <button
            onClick={() => {
              setQuestions([]);
              setPhase("home");
            }}
          >
            Play Again
          </button>
        </div>
      );
    }

    const q = questions[current];

    return (
      <QuizScreen
        question={q}
        current={current}
        total={questions.length}
        handleAnswer={handleAnswer}
      />
    );
  }
}

export default App;
