import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./index.css";
import { Button, Card, Col, Form, Input, Row } from "antd";
import FormCard from "../Components/FormCard/FormCard";

const Login: React.FC = () => {
  const handleLogin = () => {};

  return (
    <div className="login-container">
      <FormCard
        title="Welcome Back"
        inputFields={[
          { label: "Email", placeholder: "example@example.com" },
          { label: "Password", placeholder: "Password", type: "password", forgotPassword: true },
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
