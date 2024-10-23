import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/svgs/logoLight.svg";
import logoDark from "../Assets/svgs/logoDark.svg";
import { useTheme } from "../lib/ThemeProvider";
import { toast } from "react-toastify";
import FormCard from "../components/ui/FormCard";
import { motion } from "framer-motion";

interface UpdatePasswordProps {
  newPassword: string;
  confirmNewPassword: string;
}

const UpdatePassword: React.FC = () => {
  const [formData, setFormData] = useState<UpdatePasswordProps>({
    newPassword: "",
    confirmNewPassword: "",
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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (btnLoading) return;

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setBtnLoading(true);

    try {
      const email = new URLSearchParams(window.location.search).get("email");
      if (!email) {
        toast.error("Invalid password reset link.");
        setBtnLoading(false);
        return;
      }

      const response = await axios.post("https://api.speakimage.ai/api/update-password", {
        email,
        new_password: formData.newPassword,
      });

      if (response.data.message === "Password updated successfully") {
        toast.success("Password updated successfully. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = theme != "light" ? logo : logoDark;

  useEffect(() => {
    document.title = "Update Password | Speakimage";
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
              subtitle="Update your password"
              inputFields={[
                {
                  label: "",
                  placeholder: "New Password",
                  type: "password",
                  name: "newPassword",
                  value: formData.newPassword,
                  onChange: handleChange,
                  ariaLabel: "New Password",
                  ariaDescribedby:
                    "Your password should be at least 8 characters long.",
                },
                {
                  label: "",
                  placeholder: "Confirm New Password",
                  type: "password",
                  name: "confirmNewPassword",
                  value: formData.confirmNewPassword,
                  onChange: handleChange,
                  ariaLabel: "Confirm Password",
                },
              ]}
              buttonText="Update Password"
              onSubmit={handleUpdatePassword}
              btnLoading={btnLoading}
              handleSwitchChange={handleSwitchChange}
            />
          </main>
        </div>
      </section>
    </motion.div>
  );
};

export default UpdatePassword;
