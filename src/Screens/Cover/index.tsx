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
      repeatType: "mirror" as const,
    },
  };

  return (
    <>
      <div className="cover-container">
        <div className="cover-content">
          <motion.img
            src={frame1}
            alt="Frame"
            className="cover-frame-bg-gradient"
          />
          <motion.img
            src={frame2}
            alt="Frame"
            className="cover-frame-bg-ring"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={frame3}
            alt="Frame"
            className="cover-frame-bg-left-circles"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.img
            src={frame4}
            alt="Frame"
            className="cover-frame-bg-right-circles"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <motion.img
            src={logo}
            className="cover-logo"
            alt="Logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3, ease: "easeOut" }}
          />
          <div className="cover-bottom">
            <motion.span
              className="cover-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 3, ease: "easeOut" }}
            >
              Supercharge your knowledge and <br /> productivity with{" "}
              <span className="cover-title-colored"><strong>images</strong></span>
              <br /> <i>and</i> text.
            </motion.span>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 3, ease: "easeOut" }}
              className="cover-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </motion.button>
          </div>
        </div>
        <div className="cover-about-container">
          <span className="cover-about">
            There are those who think with words others <br />
            with imagery and some who use a hybrid of both.
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
