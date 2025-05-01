import React from "react";
import "./GeneratingScreen.css";

const GeneratingScreen = () => {
  return (
    <div className="generating-container">
      <div className="spinner"></div>
      <h2 className="generating-text">Generating your quiz...</h2>
      <p className="generating-text">
        This should take less than 10 seconds - enjoy these cute kittens while
        you wait!
      </p>
      <div className="kitten-gallery">
        <img src="/kitten.jpeg" alt="Cute kitten" />
        <img src="/kittens.jpeg" alt="More cute kittens" />
      </div>
    </div>
  );
};

export default GeneratingScreen;
