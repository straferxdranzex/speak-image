import React, { useEffect, useState } from "react";
import "./index.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import betaImage from "../../Assets/Images/Beta-image-1.png";
import betaImage2 from "../../Assets/Images/Beta-image-2.png";
import gradient from "../../Assets/Images/gradient-login.svg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BetaPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft(): TimeLeft {
    const targetDate = new Date("September 1, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  }
  return (
    <div className="beta-page-container">
      <div className="beta-page-gradient">
        <img src={gradient} alt="Gradient" width="100%" height="100%" />
      </div>
      <div className="beta-page-gradient-2">
        <img src={gradient} alt="Gradient" width="100%" height="100%" />
      </div>
      <motion.span
        className="beta-page-title"
        style={{ fontWeight: "bold" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 3, ease: "easeOut" }}
      >
        Welcome to{"  "}
        <Link to="/get-started" style={{ textDecoration: "none" }}>
          <span className="beta-page-title-colored">Speakimage.ai</span>
        </Link>
      </motion.span>
      <motion.span
        className="beta-page-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 3, ease: "easeOut" }}
      >
        We appreciate your visit! Speakimage.ai is in private mode for beta
        testing. We are finalizing our awesome features and will be ready to
        deploy them publicly on{" "}
        <span className="beta-page-title-colored">September 1, 2024</span>.
        <br /> See you then.
      </motion.span>
      <img
        src={betaImage}
        alt="Frame"
        width="50%"
        height="auto"
        className="beta-page-image"
      />
      <div className="beta-page-text-image-container">
        <div className="beta-page-text-container">
          <span className="beta-page-title" style={{ textAlign: "left" }}>
            Speakimage <br /> Responds <br /> With
          </span>
          <span className="beta-page-title" style={{ textAlign: "left" }}>
            <span
              className="beta-page-title-colored"
              style={{ fontWeight: "bold" }}
            >
              Images <br /> Video <br /> Text{" "}
            </span>
          </span>
        </div>
        <img
          src={betaImage2}
          alt="Frame2"
          width="50%"
          height="auto"
          className="beta-page-image-2"
        />
      </div>
      <div style={{ marginTop: "4rem" }}>
        <span className="beta-page-title">Public access will be live in</span>
      </div>
      <div className="beta-page-countdown">
        <div>
          {String(timeLeft.days).padStart(2, "0")}{" "}
          <span className="beta-page-count-title">Days</span>
        </div>
        <div>
          {String(timeLeft.hours).padStart(2, "0")}{" "}
          <span className="beta-page-count-title">Hrs</span>
        </div>
        <div>
          {String(timeLeft.minutes).padStart(2, "0")}{" "}
          <span className="beta-page-count-title">Mnts</span>
        </div>
        <div>
          {String(timeLeft.seconds).padStart(2, "0")}{" "}
          <span className="beta-page-count-title">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default BetaPage;
