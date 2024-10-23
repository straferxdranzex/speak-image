import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import betaImage from "../Assets/Images/Beta-image-1.png";
import betaImage2 from "../Assets/Images/Beta-image-2.png";
import gradient from "../Assets/Images/gradient-login.svg";

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

  useEffect(() => {
    document.title = "Beta | Speakimage";
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

  const gradientStyle = {
    background: "-webkit-linear-gradient(16deg, #4b90ff, #ff5546)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-black flex py-20 sm:py-40 w-full text-white relative">
      <div
        className="absolute w-full h-screen top-0 blur-md pointer-events-none opacity-30"
        aria-hidden="true"
        role="presentation"
      >
        <img
          src={gradient}
          alt=""
          width="100%"
          height="100%"
          className="absolute w-[30%] bottom-1 right-1 object-cover"
          aria-hidden="true"
        />
        <img
          src={gradient}
          alt=""
          width="100%"
          height="100%"
          className="absolute w-[30%] top-1 left-1 object-cover"
          aria-hidden="true"
        />
      </div>

      <main
        id="main-content"
        className="w-full flex flex-col items-center gap-8 relative z-10"
      >
        <motion.h1
          className="font-bold text-2xl sm:text-5xl leading-relaxed tracking-tighter text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 3, ease: "easeOut" }}
        >
          Welcome to{" "}
          <Link
            to="/get-started"
            className="text-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Get Started with Speakimage.ai"
          >
            Speakimage.ai
          </Link>
        </motion.h1>

        <motion.h4
          className="text-base sm:text-xl leading-normal text-center font-normal max-w-[71ch] w-[80%] sm:w-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 3, ease: "easeOut" }}
        >
          We appreciate your visit! Speakimage.ai is in private mode for beta
          testing. We are finalizing our awesome features and will be ready to
          deploy them publicly on{" "}
          <span className="text-primary-200">September 1, 2024</span>.
          <br /> See you then.
        </motion.h4>

        <img
          src={betaImage}
          alt="Speakimage Beta Testing Preview"
          className="w-[80%] sm:w-1/2 h-auto object-cover"
          style={{
            WebkitMaskImage: "linear-gradient(black, transparent)",
            maskImage: "linear-gradient(black, transparent)",
          }}
        />

        <div className="flex gap-8 w-[80%] sm:w-1/2 mt-8 items-center justify-center">
          <div className="hidden sm:flex flex-col gap-12 items-start justify-start text-left mt-4">
            <h2 className="font-medium text-5xl leading-relaxed tracking-tighter">
              Speakimage <br /> Responds <br /> With
            </h2>
            <h2 className="font-bold text-5xl leading-relaxed tracking-tighter text-primary-200">
              Images <br /> Video <br /> Text
            </h2>
          </div>
          <img
            src={betaImage2}
            alt="Visual representation of media"
            className="w-full sm:w-1/2 object-cover"
          />
        </div>

        <h2 className="mt-16 font-medium text-2xl sm:text-5xl leading-relaxed tracking-tighter">
          Public access will be live in
        </h2>
        <div className="flex gap-8 w-1/2 justify-center items-center text-2xl sm:text-5xl font-bold text-center">
          <h3 className="mx-2" style={gradientStyle}>
            {String(timeLeft.days).padStart(2, "0")}{" "}
            <span className="text-sm sm:text-2xl">Days</span>
          </h3>
          <h3 className="mx-2" style={gradientStyle}>
            {String(timeLeft.hours).padStart(2, "0")}{" "}
            <span className="text-sm sm:text-2xl">Hrs</span>
          </h3>
          <h3 className="mx-2" style={gradientStyle}>
            {String(timeLeft.minutes).padStart(2, "0")}{" "}
            <span className="text-sm sm:text-2xl">Mnts</span>
          </h3>
          <h3 className="mx-2" style={gradientStyle}>
            {String(timeLeft.seconds).padStart(2, "0")}{" "}
            <span className="text-sm sm:text-2xl">Sec</span>
          </h3>
        </div>
      </main>
    </section>
  );
};

export default BetaPage;
