import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import catImage from "../Assets/Images/signup-image.webp";
import logo from "../Assets/svgs/logoLight.svg";
import logoDark from "../Assets/svgs/logoDark.svg";
import gradient from "../Assets/Images/gradient-login.svg";
import { useTheme } from "../lib/ThemeProvider";
import { toast } from "react-toastify";
import FormCard from "../components/ui/FormCard";
import { motion } from "framer-motion";

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (btnLoading) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setBtnLoading(true);
      const response = await axios.post(
        "https://api.speakimage.ai/signup",
        {
          email: formData.email,
          password: formData.password,
          full_name: formData.fullName,
        },
        { withCredentials: true }
      );

      toast.success("Account created successfully.");
      if (response && response.data && response.data.message) {
        if (response.data.message === "User created successfully") {
          setBtnLoading(false);
          navigate("/login");
        }
        console.log(response, "signup response");
      } else {
        setBtnLoading(false);
        toast.error("Unexpected response from server.");
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setBtnLoading(false);
        toast.error("Unexpected response from server.");
      } else {
        setBtnLoading(false);
        toast.error("Unexpected response from server.");
      }
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = theme != "light" ? logo : logoDark;

  useEffect(() => {
    document.title = "Signup | Speakimage";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-screen flex relative overflow-hidden bg-card"
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
          <header className="sm:h-[10vh] flex max-sm:flex-col gap-1 items-center px-12 justify-between w-full">
            <img
              src={currentLogo}
              alt="Speakimage.ai logo"
              width="211px"
              height="77px"
              className="h-20 w-auto block"
            />
            <p className="font-light text-sm leading-none text-foreground">
              Have an account already?{" "}
              <Link
                tabIndex={0}
                to={"/login"}
                className="text-primary-200 dark:text-primary-100 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                Login!
              </Link>
            </p>
          </header>

          <main id="main-content" className="h-full flex items-center">
            <FormCard
              title="Get Started"
              subtitle="Enter your details to get started"
              inputFields={[
                {
                  label: "Full Name",
                  placeholder: "Full Name",
                  type: "text",
                  name: "fullName",
                  value: formData.fullName,
                  onChange: handleChange,
                  required: true,
                  ariaLabel: "Full Name",
                },
                {
                  label: "Email",
                  placeholder: "Email",
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  required: true,
                  ariaLabel: "Email address",
                },
                {
                  label: "Password",
                  placeholder: "Password",
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleChange,
                  required: true,
                  ariaLabel: "Password",
                  ariaDescribedby:
                    "Your password should be at least 8 characters long.",
                },
                {
                  label: "Confirm Password",
                  placeholder: "Confirm Password",
                  type: "password",
                  name: "confirmPassword",
                  value: formData.confirmPassword,
                  onChange: handleChange,
                  required: true,
                  ariaLabel: "Confirm Password",
                },
              ]}
              buttonText="Sign Up"
              handleSwitchChange={handleSwitchChange}
              onSubmit={handleSignUp}
              btnLoading={btnLoading}
            />
          </main>
        </div>
      </section>

      <section className="max-lg:hidden flex-grow relative">
        <img
          src={catImage}
          alt="Decorative image related to media types"
          className="block w-full h-full object-cover"
        />
        <div
          className="text-white absolute bottom-16 w-full max-w-[25rem] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.711)] rounded-xl h-fit p-12 flex flex-col gap-4"
          role="complementary"
        >
          <button
            className="bg-[#495e92] border-none rounded-xl w-full h-12 flex items-center justify-center text-sm leading-tight cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400"
            aria-label="Learn about the Yin-Yang symbol"
          >
            What does the yin-yang symbol mean?
          </button>
          <span className="text-base leading-normal" id="yin-yang-description">
            The Yin-Yang symbol, also known as “Taijitu,” is a fundamental
            concept in Chinese philosophy, particularly within Taoism. It
            represents the idea that opposites are interconnected and
            interdependent in the natural world, and that these opposites give
            rise to each other as they interrelate.
          </span>
        </div>
      </section>
    </motion.div>
  );
};

export default SignUp;
