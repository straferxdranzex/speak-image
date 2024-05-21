import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://speak-image-backend.vercel.app/login", {
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
      if (response.data.message === "Login successful") {
        console.log(response.data.message);
        Cookies.set("userId", response.data.user_id, { expires: 1});
        Cookies.set("userToken", response.data.token || 'dummy-token', { expires: 1 });

        navigate("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <FormCard
        title="Welcome Back"
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
      />
    </div>
  );
};

export default Login;
