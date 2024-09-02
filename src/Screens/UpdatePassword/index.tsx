import React, { useState } from "react";
import axios from "axios";
import FormCard from "../Components/FormCard/FormCard";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { Col, message, Row } from "antd";
import useLocalStorage from "use-local-storage";
import gradient from "../../Assets/Images/gradient-login.svg";
import logo from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";

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
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      message.error("Passwords do not match!");
      return;
    }

    setBtnLoading(true);
    try {
      const email = new URLSearchParams(window.location.search).get("email");
      if (!email) {
        message.error("Invalid password reset link.");
        setBtnLoading(false);
        return;
      }

      const response = await axios.post(
        "https://api.speakimage.ai/api/update-password",
        {
          email,
          new_password: formData.newPassword,
        }
      );

      if (response.data.message === "Password updated successfully") {
        message.success("Password updated successfully. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      message.error("Failed to update password. Please try again.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSwitchChange = () => {};

  const currentLogo = isDark ? logo : logoDark;

  return (
    <div className="update-password-container">
      <div className="update-password-form-container">
        <Row className="update-password-form-header">
          <Col span={24} md={12} className="update-password-form-header-logo">
            <img src={currentLogo} alt="Logo" width="211px" height="77px" />
          </Col>
          <Col span={24} md={12} className="update-password-form-header-text-container">
            <span className="update-password-form-header-text">
              Want to go back to login?{" "}
              <span
                className="update-password-form-header-text-highlight"
                onClick={() => navigate("/login")}
              >
                Login!
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="update-password-form-card">
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
                },
                {
                  label: "Password",
                  placeholder: "Confirm New Password",
                  type: "password",
                  name: "confirmNewPassword",
                  value: formData.confirmNewPassword,
                  onChange: handleChange,
                  forgotPassword: true,
                },
              ]}
              buttonText="Update Password"
              onButtonClick={handleUpdatePassword}
              btnLoading={btnLoading}
              handleSwitchChange={handleSwitchChange}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdatePassword;
