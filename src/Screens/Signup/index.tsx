import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import { Col, message, Row } from "antd";
import catImage from "../../Assets/Images/signup-image.jpeg";
import logo from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";
import useLocalStorage from "use-local-storage";
import gradient from "../../Assets/Images/gradient-login.svg";

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
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
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

      message.success("Account created successfully.");
      if (response && response.data && response.data.message) {
        if (response.data.message === "User created successfully") {
          setBtnLoading(false);
          window.location.href = "/login";
        }
        console.log(response, "signup response");
      } else {
        setBtnLoading(false);
        message.error("Unexpected response from server.");
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        setBtnLoading(false);
        message.error("Unexpected response from server.");
      } else {
        setBtnLoading(false);
        message.error("Unexpected response from server.");
      }
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = isDark ? logo : logoDark;

  return (
    <div className="signup-container">
      <div className="signup-gradient">
        <img src={gradient} alt="Gradient" width="100%" height="100%" />
      </div>
      <div className="signup-form-container">
        <Row className="signup-form-header">
          <Col span={24} md={12} className="signup-form-header-logo">
            <img src={currentLogo} alt="Logo" width="211px" height="77px" />
          </Col>
          <Col span={24} md={12} className="signup-form-header-text-container">
            <span className="signup-form-header-text">
              Have an account already?{" "}
              <span
                className="signup-form-header-text-highlight"
                onClick={() => navigate("/login")}
              >
                Login!
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="signup-form-card">
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
                },
                {
                  label: "Email",
                  placeholder: "Email",
                  type: "email",
                  name: "email",
                  value: formData.email,
                  onChange: handleChange,
                },
                {
                  label: "Password",
                  placeholder: "Password",
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleChange,
                },
                {
                  label: "Confirm Password",
                  placeholder: "Confirm Password",
                  type: "password",
                  name: "confirmPassword",
                  value: formData.confirmPassword,
                  onChange: handleChange,
                },
              ]}
              buttonText="Sign Up"
              handleSwitchChange={handleSwitchChange}
              onButtonClick={handleSignUp}
              btnLoading={btnLoading}
            />
          </Col>
        </Row>
      </div>
      <div className="signup-image-container">
        <div className="signup-image-text-card">
          <button className="signup-image-button">
            What does the yin-yang symbol mean?
          </button>
          <span className="signup-image-text">
            The Yin-Yang symbol, also known as “Taijitu,” is a fundamental
            concept in Chinese philosophy, particularly within Taoism. It
            represents the idea that opposites are interconnected and
            interdependent in the natural world, and that these opposites give
            rise to each other as they interrelate.
          </span>
        </div>
        <img src={catImage} alt="Image" className="signup-image" />
      </div>
    </div>
  );
};

export default SignUp;
