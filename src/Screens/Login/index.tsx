import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setBtnLoading(true);
      const response = await axios.post(
        "https://api.speakimage.ai/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      message.success("Logged-in successfully.");

      if (response.data.message === "Login successful") {
        setBtnLoading(false);
        console.log(response.data.message);
        Cookies.set("userId", response.data.user_id, { expires: 15 });
        Cookies.set("userToken", response.data.token || "dummy-token", {
          expires: 15,
        });
        navigate("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        message.error("Unexpected error occurred. Please try again.");
      } else {
        message.error("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <FormCard
        title="Welcome"
        inputFields={[
          {
            label: "Email",
            placeholder: "example@example.com",
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
        extraText="Don't have an account?"
        extraLinkText="Sign Up"
        extraLinkUrl="/signup"
        btnLoading={btnLoading}
      />
    </div>
  );
};

export default Login;
