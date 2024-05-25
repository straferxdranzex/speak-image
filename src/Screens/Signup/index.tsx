import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./Index.css";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://api.speakimage.ai/signup", {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
      },{withCredentials: true
        });

      if (response && response.data && response.data.message) {
        // alert(response.data.message);
        if (response.data.message === "User created successfully") {
          window.location.href = "/login";
        }
        console.log(response, "signup response")
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        // alert(error.response.data.message);
      } else {
        // alert("An unexpected error occurred. Please try again.");
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
      />
    </div>
  );
};

export default SignUp;
