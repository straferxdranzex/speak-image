import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./Index.css";
import { message } from "antd";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords do not match");
      return;
    }

    try {
      setBtnLoading(true);
      const response = await axios.post("https://api.speakimage.ai/signup", {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
      },{withCredentials: true
        });

      message.success("Account created successfully.");
      if (response && response.data && response.data.message) {
        if (response.data.message === "User created successfully") {
          setBtnLoading(false);
          window.location.href = "/login";
        }
        console.log(response, "signup response")
      } else {
        message.error("Unexpected response from server.");
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        message.error("Unexpected response from server.");
      } else {
        message.error("Unexpected response from server.");
      }
    }
  };

  return (
    <div className="signup-container">
      <FormCard
        title="Create an account"
        inputFields={[
          {
            label: "Full Name",
            placeholder: "John Smith",
            type: "text",
            name: "fullName",
            value: formData.fullName,
            onChange: handleChange,
          },
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
        onButtonClick={handleSignUp}
        extraText="Already have an account?"
        extraLinkText="Login"
        extraLinkUrl="/login"
        btnLoading={btnLoading}
      />
    </div>
  );
};

export default SignUp;
