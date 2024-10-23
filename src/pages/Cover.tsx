import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/svgs/logoLight.svg";
import frame1 from "../Assets/Images/Frame-1.webp";
import frame2 from "../Assets/Images/Frame-2.webp";
import frame3 from "../Assets/Images/Frame-3.webp";
import frame4 from "../Assets/Images/Frame-4.webp";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { useEffect } from "react";

const Cover: React.FC = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  const handleGetInTouchClick = () => {
    window.open("mailto:contact@speakimage.ai", "_blank");
  };

  useEffect(() => {
    document.title = "Get Started | Speakimage";
  }, []);

  return (
    <main className="relative w-full h-fit bg-black text-white">
      <div
        className="pointer-events-none absolute w-full h-[150vh] sm:h-[130vh] top-0 flex flex-col justify-center items-center gap-16 overflow-hidden"
        role="presentation"
      >
        <motion.img
          src={frame1}
          alt="Background image 1"
          className="absolute object-fill top-0 h-screen w-full"
        />
        <motion.img
          src={frame2}
          alt="Background image 2"
          className="max-sm:min-w-[265vw] absolute object-fill h-screen top-0 left-1/2 -translate-x-1/2 "
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.img
          src={frame3}
          alt="Background image 3"
          className="max-sm:min-w-[265vw] absolute sm:h-full top-0 left-0 translate-y-0"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.img
          src={frame4}
          alt="Background image 4"
          className="max-sm:min-w-[265vw] absolute sm:h-full top-0 right-0 translate-y-0"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      <section
        id="main-content"
        className="min-h-screen relative z-10 flex flex-col items-center justify-center gap-10 2xl:gap-16 px-5 pt-12 pb-28"
      >
        <motion.img
          src={logo}
          className="w-[12.6rem] sm:w-[25.9375rem] h-auto mb-auto"
          alt="SpeakImage.ai logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
        />
        <motion.h1
          className="mt-10 sm:mt-12 font-medium text-3xl sm:text-4xl lg:text-5xl !leading-relaxed tracking-tight text-center max-w-[18ch] sm:max-w-[28ch]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
        >
          Supercharge your knowledge and productivity with{" "}
          <span className="text-primary-200 font-bold">images</span>{" "}
          <span className="italic">
            <br /> and
          </span>{" "}
          text.
        </motion.h1>
        <motion.div
          aria-label="get started"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 3, ease: "easeOut" }}
        >
          <Button onClick={handleGetStartedClick}>Get Started</Button>
        </motion.div>
        <div className="mt-auto"></div>
      </section>
      <section className="min-h-screen max-sm:bg-gradient-to-b from-transparent to-black to-50% relative z-10 w-full flex flex-col justify-center items-center gap-12 py-6 px-10">
        <h2 className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed text-center max-w-[22ch] sm:max-w-[40ch]">
          There are those who think with words others with imagery and some who
          use a hybrid of both.
        </h2>
        <h2 className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed text-center max-w-[20ch] sm:max-w-[50ch] mb-2 sm:mb-10">
          <span className="text-primary-200">SpeakImage.ai</span> gives prompt
          responses that are designed for the image and hybrid thinkers by
          placing pictures and video first, followed by text.
        </h2>
        <Button variant="outline" onClick={handleGetInTouchClick}>
          Get In Touch{" "}
          <FaArrowRight role="presentation" className="text-base" />
        </Button>
      </section>
    </main>
  );
};

export default Cover;
