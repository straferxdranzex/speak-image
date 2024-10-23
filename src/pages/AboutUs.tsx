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
      className="w-full min-h-screen lg:h-screen flex relative lg:overflow-hidden bg-card"
      role="main"
    >
      <section
        className="w-full lg:w-[57%] flex-shrink-0 relative overflow-hidden"
      >
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
            className="h-full flex flex-col gap-2 sm:gap-7 items-start p-[5rem_1rem] sm:p-[5rem_3rem]"
            aria-labelledby="about-us-title"
          >
            <img
              src={currentLogo}
              alt="Speakimage.ai logo"
              width="211px"
              height="77px"
              className="-ml-6 h-20 w-auto block"
            />
            <h1 id="about-us-title" className="text-2xl sm:text-4xl leading-tight font-semibold">About Us</h1>
            <p className="text-base sm:text-lg leading-relaxed">
              The use of AI apps, particularly generative pre-trained
              transformers (GPTs) have increased productivity and given
              individuals instant access to valuable information with the click
              of a button. Almost every GPT on the market, however, is solely
              text-based. A user types in a prompt and receives a lengthy,
              text-only response. Some individuals are text-only thinkers, so
              this output is suitable. Other individuals are image-only
              thinkers, making this output incompatible with their mode of
              thinking. Most people are a combination of both.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              <span className="dark:text-primary-100 font-semibold">Speakimage.ai</span> was
              created by See Computing founder, Karmel Graham, after she noticed
              this gap in the GPT output format. She wanted a GPT tool that was
              thoughtful toward all ways of thinking, and took into
              consideration individuals with disabilities.
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              <span className="dark:text-primary-100 font-semibold">Speakimage.ai</span> was
              developed and trained to add images to appropriate output
              responses and, thus, cover a greater range of thought processes.
            </p>
          </main>
        </div>
      </section>

      <section
        className="max-lg:hidden flex-grow relative"
      >
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
