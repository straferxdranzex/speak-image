import { Avatar, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import "./index.css";
import { FaLightbulb } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSearchengin } from "react-icons/fa6";

const ContentContainer: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const content = [
    {
      key: "1",
      text: "Revise my writing and fix my grammar",
      icon: <FaLightbulb />,
    },
    { key: "2", text: "Act on my mistakes", icon: <FaPenToSquare /> },
    {
      key: "3",
      text: "Look up a Linux shell command for creating a directory",
      icon: <FaSearchengin />,
    },
    { key: "4", text: "Fix my grammar", icon: <FaLightbulb /> },
  ];

  return (
    <div className="content-container">
      <Row gutter={[32, 32]} className="content-row">
        <Col span={24} style={{paddingLeft: "22rem"}}>
          <span className="content-title content-text">Hey, JOHN SMITH</span>
        </Col>
        <Col span={24} style={{paddingLeft: "22rem"}}>
          <span className="content-title">
            Ready for some magic? What can I assist you with today?
          </span>
        </Col>
        {content.map((item, index) => {
          return (
            <Col span={4} key={index} className="content-card-container">
              <Card
                className={`content-card ${
                  hoveredCard === item.key ? "content-card-hover" : ""
                }`}
                onMouseEnter={() => setHoveredCard(item.key)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <span className="content-card-text">{item.text}</span>
                <span className="content-card-icon">{item.icon}</span>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ContentContainer;
