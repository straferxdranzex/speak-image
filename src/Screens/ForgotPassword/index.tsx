import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { Col, message, Row } from "antd";
import FormCard from "../Components/FormCard/FormCard";
import "./index.css";
import catImage from "../../Assets/Images/form-image.png";
import logo from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";
import useLocalStorage from "use-local-storage";
import gradient from "../../Assets/Images/gradient-login.svg";

interface ForgotPasswordProps {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordProps>({
    email: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      message.error("Please enter your email.");
      return;
    }

    setBtnLoading(true);

    try {
      const emailCheckResponse = await axios.post(
        "https://api.speakimage.ai/api/check-email",
        { email: formData.email }
      );

      if (emailCheckResponse.data.exists) {
        const templateParams = {
          from_name: "SpeakImageAI",
          user_email: formData.email,
          reset_link: `https://speakimage.ai/update-password?email=${formData.email}`, // Replace with your actual reset password URL
        };

        emailjs.send(
          "service_docdl2g",     // Replace with your EmailJS Service ID
          "template_0tq8571",    // Replace with your EmailJS Template ID
          templateParams,
          "hY8VJ7KswAGlL-uem"         // Replace with your EmailJS User ID
        ).then((response) => {
          console.log("Email successfully sent!", response.status, response.text);
          message.success("Password reset email sent! Please check your inbox.");
          navigate("/login");
        }).catch((error) => {
          console.error("Failed to send email:", error);
          message.error("Failed to send password reset email. Please try again.");
        });
      } else {
        message.error("No account found with this email address.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = isDark ? logo : logoDark;

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <Row className="forgot-password-form-header">
          <Col span={24} md={12} className="forgot-password-form-header-logo">
            <img src={currentLogo} alt="Logo" width="211px" height="77px" />
          </Col>
          <Col span={24} md={12} className="forgot-password-form-header-text-container">
            <span className="forgot-password-form-header-text">
              Want to go back to login?{" "}
              <span className="forgot-password-form-header-text-highlight" onClick={() => navigate("/login")}>Login!</span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="forgot-password-form-card">
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
                },
              ]}
              buttonText="Get a password reset Email"
              onButtonClick={handleForgotPassword}
              btnLoading={btnLoading}
              handleSwitchChange={handleSwitchChange}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
