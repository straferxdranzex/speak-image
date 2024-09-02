import React, { useState } from "react";
import "./index.css";
import { Button, Card, Col, Form, Input, Row, Switch } from "antd";
import { Link } from "react-router-dom";

interface InputField {
  label: string;
  placeholder: string;
  type?: string;
  forgotPassword?: boolean;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginSignupCardProps {
  title: string;
  subtitle: string;
  inputFields: InputField[];
  buttonText: string;
  onButtonClick: () => void;
  handleSwitchChange: () => void;
  btnLoading?: boolean;
  showSwitch?: boolean;
}

const FormCard: React.FC<LoginSignupCardProps> = ({
  title,
  subtitle,
  inputFields,
  buttonText,
  onButtonClick,
  handleSwitchChange,
  btnLoading,
  showSwitch = false,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="login-container">
      <Row>
        <Col span={24} className="login-heading-container">
          <span className="login-heading">{title}</span>
          <span className="login-subheading">{subtitle}</span>
        </Col>
        <Col span={24} className="login-card-container">
          <Card
            className={`login-card ${isHovered || isFocused ? "zoom-in" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Form layout="vertical">
              {inputFields.map((field, index) => (
                <Col
                  key={index}
                  span={24}
                  className="login-form-input-container"
                >
                  <Form.Item
                    label={
                      <span className="login-form-labels">{field.label}</span>
                    }
                    required
                  >
                    {field.type === "password" ? (
                      <Input.Password
                        name={field.name}
                        className="login-form-input"
                        placeholder={field.placeholder}
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    ) : (
                      <Input
                        name={field.name}
                        className="login-form-input"
                        placeholder={field.placeholder}
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                    )}
                  </Form.Item>
                </Col>
              ))}
              {showSwitch && (
                <Col span={24} className="form-card-forgot-password-row">
                  <Switch defaultChecked onChange={handleSwitchChange} />
                  <Link to="/forgot-password">
                    <span className="form-card-forgot-password-text">
                      Forgot password?
                    </span>
                  </Link>
                </Col>
              )}
              <Col span={24}>
                <Form.Item>
                  <Button
                    className="login-btn"
                    htmlType="submit"
                    onClick={onButtonClick}
                    loading={btnLoading}
                  >
                    {buttonText}
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormCard;
