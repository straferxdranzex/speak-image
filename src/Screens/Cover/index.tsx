import React from "react";
import "./index.css";
import logo from "../../Assets/svgs/logoLight.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import frame1 from "../../Assets/Images/Frame-1.png";
import frame2 from "../../Assets/Images/Frame-2.png";
import frame3 from "../../Assets/Images/Frame-3.png";
import frame4 from "../../Assets/Images/Frame-4.png";
import { motion } from "framer-motion";

const Cover: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  const handleGetInTouchClick = () => {
    window.open("mailto:contact@speakimage.ai", "_blank");
  };

  const waveAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.1, 1, 0.1],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  };

  return (
    <>
      <div className="cover-container">
        <div className="cover-content">
          <motion.img
            src={frame1}
            alt="Frame"
            className="cover-frame-bg-gradient"
            initial={{ scale: 1, opacity: 1 }}
            animate={waveAnimation}
          />
          <motion.img
            src={frame2}
            alt="Frame"
            className="cover-frame-bg-ring"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ type: "spring", stiffness: 50, delay: 1 }}
          />
          <motion.img
            src={frame3}
            alt="Frame"
            className="cover-frame-bg-left-circles"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ type: "spring", stiffness: 50, delay: 1 }}
          />
          <motion.img
            src={frame4}
            alt="Frame"
            className="cover-frame-bg-right-circles"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ type: "spring", stiffness: 50, delay: 1 }}
          />

          <motion.img
            src={logo}
            className="cover-logo"
            alt="Logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3, ease: "easeOut" }}
          />
          <motion.span
            className="cover-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3, ease: "easeOut" }}
          >
            Supercharge your creativity and
            <br />
            productivity <span className="cover-title-colored">visually</span>
          </motion.span>
          <button className="cover-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
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
            prompt responses that are designed for
            <br /> the image and hybrid thinkers by placing pictures and video
            <br /> first, followed by text.
          </span>
          <button
            className="cover-about-button"
            onClick={handleGetInTouchClick}
          >
            Get In Touch <FaArrowRight className="cover-about-icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Cover;
