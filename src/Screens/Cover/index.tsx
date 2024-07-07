import React from "react";
import "./index.css";
import logo from "../../Assets/svgs/logoLight.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cover: React.FC = () => {

  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/login");
  }

  return (
    <>
      <div className="cover-container">
        <div className="cover-content">
          <img src={logo} className="cover-logo" alt="Logo" />
          <span className="cover-title">
            Supercharge your creativity and
            <br />
            productivity <span className="cover-title-colored">visually</span>
          </span>
          <button className="cover-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
        <div className="cover-about-container">
          <span className="cover-about">
            <span className="cover-title-colored">SpeakImage.ai</span> is a GPT
            tool created for the visually inclined.
            <br /> There are people who think in text, others in imagery and
            some
            <br /> who think in a hybrid of both language and image.
          </span>
          <span className="cover-about">
            <span className="cover-title-colored">SpeakImage.ai</span> gives
            prompt responses that are designed for<br /> the image and hybrid thinkers
            by placing pictures and video<br /> first, followed by text.
          </span>
          <button className="cover-about-button">Get In Touch <FaArrowRight className="cover-about-icon" /></button>
        </div>
      </div>
    </>
  );
};

export default Cover;
