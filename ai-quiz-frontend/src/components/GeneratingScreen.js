import React from "react";
import "./GeneratingScreen.css";

const GeneratingScreen = () => {
  return (
    <div className="generating-container">
      <div className="spinner"></div>
      <h2 className="generating-text">Generating your quiz...</h2>
      <p className="generating-text">
        This should take less than 10 seconds don't worry!
      </p>
    </div>
  );
};

export default GeneratingScreen;
