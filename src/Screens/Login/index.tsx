import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Col, message, Row } from "antd";
import catImage from "../../Assets/Images/login-image.jpeg";
import logo from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";
import useLocalStorage from "use-local-storage";
import gradient from "../../Assets/Images/gradient-login.svg";
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
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
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

      message.success("Logged-in successfully.");

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
        message.error("Incorrect username or password. Please try again.");
      } else {
        message.error("Unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = isDark ? logo : logoDark;

  return (
    <div className="login-container">
      <div className="login-gradient">
        <img src={gradient} alt="Gradient" width="100%" height="100%" />
      </div>
      <div className="login-form-container">
        <Row className="login-form-header">
          <Col span={24} md={12} className="login-form-header-logo">
            <img src={currentLogo} alt="Logo" width="211px" height="77px" />
          </Col>
          <Col span={24} md={12} className="login-form-header-text-container">
            <span className="login-form-header-text">
              Don’t have an account?{" "}
              <span
                className="login-form-header-text-highlight"
                onClick={() => navigate("/signup")}
              >
                Sign up!
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="login-form-card">
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
                },
                {
                  label: "Password",
                  placeholder: "Password",
                  type: "password",
                  name: "password",
                  value: formData.password,
                  onChange: handleChange,
                  forgotPassword: true,
                },
              ]}
              buttonText="Login"
              onButtonClick={handleLogin}
              showSwitch
              btnLoading={btnLoading}
              handleSwitchChange={handleSwitchChange}
            />
          </Col>
        </Row>
      </div>
      <div className="login-image-container">
        <div className="login-image-text-card">
          <button className="login-image-button">
            What is a fibonacci spiral?
          </button>
          <span className="login-image-text">
            A Fibonacci spiral is a geometric pattern that
            <br /> approximates the shape of a logarithmic spiral,
            <br /> and it’s created by drawing quarter-circle <br />
            arcs inside squares of Fibonacci number sizes.
          </span>
        </div>
        <img src={catImage} alt="Image" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
