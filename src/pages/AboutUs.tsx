import React, { useEffect } from "react";
import catImage from "../Assets/Images/about-us.jpeg";
import logo from "../Assets/svgs/logoLight.svg";
import logoDark from "../Assets/svgs/logoDark.svg";
import gradient from "../Assets/Images/gradient-login.svg";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/ThemeProvider";
import { motion } from "framer-motion";

const AboutUs: React.FC = () => {
  const { theme } = useTheme();
  const currentLogo = theme != "light" ? logo : logoDark;

  useEffect(() => {
    document.title = "About Us | Speakimage";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full min-h-screen flex relative bg-card"
      role="main"
    >
      <section className="w-full lg:w-[57%] flex-shrink-0 relative overflow-hidden">
        <img
          src={gradient}
          alt="Gradient background"
          width="100%"
          height="100%"
          className="absolute right-[0%] lg:right-[-70%] bottom-[-20%] lg:bottom-0 z-50 opacity-80 pointer-events-none"
        />
        <div className="w-full h-full flex flex-col relative z-[1000]">
          <Link
            to={"/"}
            aria-label="Go back to the homepage"
            className="absolute top-8 left-4 sm:left-12 rounded-lg w-12 h-8 cursor-pointer grid place-content-center border-b border-neutral-700 dark:border-primary-100 text-neutral-700 dark:text-primary-100 text-2xl"
          >
            <IoArrowBackOutline />
          </Link>
          <main
            id="main-content"
            className="h-full  flex flex-col gap-2 sm:gap-7 items-start p-[5rem_1rem] sm:p-[5rem_3rem]"
            aria-labelledby="about-us-title"
          >
            <img
              src={currentLogo}
              alt="Speakimage.ai logo"
              width="211px"
              height="77px"
              className="-ml-6 h-20 w-auto block"
            />
            <h1
              id="about-us-title"
              className="text-2xl sm:text-4xl leading-tight font-semibold"
            >
              About Us
            </h1>
            <p className="text-base sm:text-lg leading-relaxed">
              <b>Speakimage.ai</b> was created by See Computing founder, Karmel
              Graham, after she noticed that informational GPT tools on the
              market followed a “text-only” output format. Karmel saw the need
              for a GPT tool that considered image-based thinkers, as well as
              text-based thinkers; especially since most individuals are a
              combination of both. With speakimage.ai, a user enters in a prompt
              and will receive a text response in addition to accompanying
              images and video.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              <span className="dark:text-primary-100 font-semibold">
                How to use speakimage.ai
              </span>
              <br />
              Simply enter in a prompt such as:
              <br />
              ”Explain the causes of climate change in simple terms for a
              10-year-old child to understand.”
              <br />
              “What are the top 10 global cities for population?” <br />
              “What type of math requires the use of the Pythagorean theorem?”{" "}
              <br />
              “Suggest some marketing ideas for a local coffee shop.”
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              <span className="dark:text-primary-100 font-semibold">
                Disclaimer:
              </span>{" "}
              Speakimage.ai is not an image generator. Asking speakimag.ai to
              create an image will generate an error response. Speakimage.ai
              will output informational images and video that correlate to the
              user prompt when available.
            </p>
          </main>
        </div>
      </section>

      <section className="max-lg:hidden flex-grow sticky top-0 h-screen">
        <img
          src={catImage}
          alt="Decorative image related to media types"
          className="block w-full h-full object-cover"
        />
      </section>
    </motion.div>
  );
};

export default AboutUs;
