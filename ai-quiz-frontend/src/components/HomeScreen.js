import React from "react";
import "./HomeScreen.css";

const HomeScreen = ({ topic, setTopic, handleSubmit }) => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to the AI Quiz Game</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter any topic you want (e.g. pop culture, premier league, music, etc.)"
            required
          />
          <button type="submit">Generate Quiz</button>
        </form>
      </div>
    </div>
  );
};

export default HomeScreen;
