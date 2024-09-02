import React from "react";
import "./index.css";
import catImage from "../../Assets/Images/about-us.jpeg";
import logo from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";
import useLocalStorage from "use-local-storage";
import gradient from "../../Assets/Images/gradient-login.svg";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AboutUs: React.FC = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
  const navigate = useNavigate();

  const currentLogo = isDark ? logo : logoDark;

  return (
    <div className="about-container">
      <div className="about-back-icon-container" onClick={() => navigate("/")}>
        <IoArrowBackOutline className="about-back-icon" />
      </div>
      <div className="about-gradient">
        <img src={gradient} alt="Gradient" width="100%" height="100%" />
      </div>
      <div className="about-form-container">
        <img
          src={currentLogo}
          alt="Logo"
          width="211px"
          height="77px"
          className="about-logo"
        />
        <span className="about-title">About Us</span>
        <span className="about-text">
          The use of AI apps, particularly generative pre-trained transformers
          (GPTs) have increased productivity and given individuals instant
          access to valuable information with the click of a button. Almost
          every GPT on the market, however, is solely text-based. A user types
          in a prompt and receives a lengthy, text-only response. Some
          individuals are text-only thinkers, so this output is suitable. Other
          individuals are image-only thinkers, making this output incompatible
          with their mode of thinking. Most people are a combination of both.{" "}
        </span>
        <span className="about-text">
          <span className="about-colored-text">Speakimage.ai</span> was created
          by See Computing founder, Karmel Graham, after she noticed this gap in
          the GPT output format. She wanted a GPT tool that was thoughtful
          toward all ways of thinking, and took into consideration individuals
          with disabilities.
          <br />
          <br /> <span className="about-colored-text">Speakimage.ai</span> was
          developed and trained to add images to appropriate output responses
          and, thus, cover a greater range of thought processes.
        </span>
      </div>
      <div className="about-image-container">
        <img src={catImage} alt="Image" className="about-image" />
      </div>
    </div>
  );
};

export default AboutUs;
