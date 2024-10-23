import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/svgs/logoLight.svg";
import logoDark from "../Assets/svgs/logoDark.svg";
import { useTheme } from "../lib/ThemeProvider";
import { toast } from "react-toastify";
import FormCard from "../components/ui/FormCard";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface ForgotPasswordProps {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordProps>({
    email: "",
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (btnLoading) return;

    if (!formData.email) {
      toast.error("Please enter your email.");
      return;
    }

    setBtnLoading(true);

    try {
      const emailCheckResponse = await axios.post("https://api.speakimage.ai/api/check-email", {
        email: formData.email,
      });

      if (emailCheckResponse.data.exists) {
        const templateParams = {
          from_name: "SpeakImageAI",
          user_email: formData.email,
          reset_link: `https://speakimage.ai/update-password?email=${formData.email}`, // Replace with your actual reset password URL
        };

        emailjs
          .send(
            "service_docdl2g", // Replace with your EmailJS Service ID
            "template_0tq8571", // Replace with your EmailJS Template ID
            templateParams,
            "hY8VJ7KswAGlL-uem" // Replace with your EmailJS User ID
          )
          .then((response) => {
            console.log(
              "Email successfully sent!",
              response.status,
              response.text
            );
            toast.success(
              "Password reset email sent! Please check your inbox."
            );
            navigate("/login");
          })
          .catch((error) => {
            console.error("Failed to send email:", error);
            toast.error(
              "Failed to send password reset email. Please try again."
            );
          });
      } else {
        toast.error("No account found with this email address.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = theme != "light" ? logo : logoDark;

  useEffect(() => {
    document.title = "Forgot Password | Speakimage";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-screen flex relative overflow-hidden bg-card"
    >
      <section className="w-full flex-shrink-0 relative overflow-hidden">
        <div className="w-full h-full flex flex-col relative z-[1000]">
          <header className="max-w-5xl mx-auto sm:h-[10vh] flex max-sm:flex-col gap-1 items-center px-12 justify-between w-full">
            <img
              src={currentLogo}
              alt="Company logo"
              width="211px"
              height="77px"
              className="h-20 w-auto block"
            />
            <p className="font-light text-sm leading-none text-foreground">
              Want to go back to login?{" "}
              <Link
                tabIndex={0}
                to="/login"
                className="text-primary-200 dark:text-primary-100 font-medium hover:underline"
                aria-label="Navigate to the login page"
              >
                Login!
              </Link>
            </p>
          </header>
          <main id="main-content" className="h-full flex items-center">
            <FormCard
              title="Hey Fella!"
              subtitle="Enter your Email to get a password reset email!"
              inputFields={[
                {
                  label: "",
                  placeholder: "Email",
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                  ariaLabel: "Email address",
                },
              ]}
              buttonText="Get a password reset Email"
              onSubmit={handleForgotPassword}
              btnLoading={btnLoading}
              handleSwitchChange={handleSwitchChange}
            />
          </main>
        </div>
      </section>
    </motion.div>
  );
};

export default ForgotPassword;
