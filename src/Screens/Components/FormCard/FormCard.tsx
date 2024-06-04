import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./index.css";
import { Button, Card, Col, Form, Input, Row } from "antd";
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
  inputFields: InputField[];
  buttonText: string;
  onButtonClick: () => void;
  extraText: string;
  extraLinkText: string;
  extraLinkUrl: string;
  btnLoading?: boolean;
}

const FormCard: React.FC<LoginSignupCardProps> = ({
  title,
  inputFields,
  buttonText,
  onButtonClick,
  extraText,
  extraLinkText,
  extraLinkUrl,
  btnLoading,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="login-container">
      <Row>
        <Col span={24} className="login-heading-container">
          <span className="login-heading">{title}</span>
        </Col>
        <Col span={24} className="login-card-container">
          <Card
            className={`login-card ${isHovered || isFocused ? "zoom-in" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Form layout="vertical">
              {inputFields.map((field, index) => (
                <Col key={index} span={24}>
                  <Form.Item
                    label={
                      <span className="login-form-labels">{field.label}</span>
                    }
                    required
                  >
                    {field.type === "password" ? (
                      <Input.Password
                        name={field.name}
                        size="large"
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
                        size="large"
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
              <Col span={24}>
                <Form.Item>
                  <Button
                    className="login-btn"
                    size="large"
                    htmlType="submit"
                    type="primary"
                    onClick={onButtonClick}
                    loading={btnLoading}
                  >
                    {buttonText}
                  </Button>
                </Form.Item>
              </Col>
              <Col span={24} className="login-last-text-container">
                <span className="login-last-text">
                  {extraText}{" "}
                  <Link to={extraLinkUrl}>
                    <span className="login-signup-text">{extraLinkText}</span>
                  </Link>
                </span>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormCard;
