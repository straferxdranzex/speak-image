import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import catImage from "../Assets/Images/login-image.webp";
import logo from "../Assets/svgs/logoLight.svg";
import logoDark from "../Assets/svgs/logoDark.svg";
import gradient from "../Assets/Images/gradient-login.svg";
import { useTheme } from "../lib/ThemeProvider";
import { toast } from "react-toastify";
import FormCard from "../components/ui/FormCard";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(btnLoading) return;


    try {
      setBtnLoading(true);
      const response = await axios.post(
        "https://api.speakimage.ai/login",
        new URLSearchParams({
          username: formData.email,
          password: formData.password,
        }),
        { withCredentials: true }
      );

      toast.success("Logged-in successfully.");

      const { access_token, user_id } = response.data;
      if (access_token && user_id) {
        setBtnLoading(false);
        Cookies.set("userId", user_id, { expires: 15 });
        Cookies.set("userToken", access_token, { expires: 15 });
        navigate("/");
      } else {
        throw new Error("Login failed. No token or user ID received.");
      }
    } catch (error: any) {
      setBtnLoading(false);
      if (error.response && error.response.data) {
        toast.error("Incorrect username or password. Please try again.");
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = theme != "light" ? logo : logoDark;

  useEffect(() => {
    document.title = "Login | Speakimage";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-screen flex relative overflow-hidden bg-card"
    >
      <section
        className="w-full lg:w-[57%] flex-shrink-0 relative overflow-hidden"
        role="region"
      >
        <img
          src={gradient}
          alt="Gradient background decoration"
          width="100%"
          height="100%"
          className="absolute right-[0%] lg:right-[-70%] bottom-[-20%] lg:bottom-0 z-50 opacity-80 pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-full h-full flex flex-col relative z-[1000]">
          <header className="sm:h-[10vh] flex max-sm:flex-col gap-1 items-center px-12 justify-between w-full">
            <img
              src={currentLogo}
              alt="Company logo"
              width="211px"
              height="77px"
              className="h-20 w-auto block"
            />
            <p className="font-light text-sm leading-none text-foreground">
              Don't have an account?{" "}
              <Link
                tabIndex={0}
                to="/signup"
                className="text-primary-200 dark:text-primary-100 font-medium hover:underline"
              >
                Sign up!
              </Link>
            </p>
          </header>
          <main
            id="main-content"
            className="h-full flex items-center"
          >
            <FormCard
              title="Welcome Back"
              subtitle="Login to your account"
              inputFields={[
                {
                  label: "",
                  placeholder: "Email",
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  ariaLabel: "Email address", // Accessible aria-label
                },
                {
                  label: "Password",
                  placeholder: "Password",
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleChange,
                  forgotPassword: true,
                  ariaLabel: "Password", // Accessible aria-label
                  ariaDescribedby:
                    "Your password should be at least 8 characters long.",
                },
              ]}
              buttonText="Login"
              showSwitch
              handleSwitchChange={handleSwitchChange}
              onSubmit={handleLogin}
              btnLoading={btnLoading}
            />
          </main>
        </div>
      </section>

      <section
        className="max-lg:hidden flex-grow relative"
        role="img"
      >
        <img
          src={catImage}
          alt="Decorative image related to Fibonacci spiral"
          className="block w-full h-full object-cover"
        />
        <div
          className="text-white absolute bottom-16 w-full max-w-[25rem] left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.711)] rounded-xl h-fit p-12 flex flex-col gap-4"
          role="complementary"
          aria-label="Information about Fibonacci spiral"
        >
          <button
            className="bg-[#495e92] border-none rounded-xl w-full h-12 flex items-center justify-center text-sm leading-tight cursor-pointer"
            aria-label="Learn more about the Fibonacci spiral"
          >
            What is a Fibonacci spiral?
          </button>
          <span className="text-base leading-normal" id="image-description">
            A Fibonacci spiral is a geometric pattern that approximates the
            shape of a logarithmic spiral, and it's created by drawing
            quarter-circle arcs inside squares of Fibonacci number sizes.
          </span>
        </div>
      </section>
    </motion.div>
  );
};

export default Login;
