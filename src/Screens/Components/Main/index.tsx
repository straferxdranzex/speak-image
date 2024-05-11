import { useContext } from "react";
import { assets } from "../../../Assets/assets/assets";
import "./index.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Button, Card, Col, Popover, Row, Space } from "antd";

const Main = () => {
  const showResults = false;
  const recentPrompt = "Suggest Some Place To Visit In Kochi";
  const loading = false;
  const handleCardClick = (promptText: any) => {};

  const logout = () => {
    console.log("Logged out");
  };

  const content = (
    <Card className="profile-card">
      <Row>
        <Col span={24} style={{ paddingBottom: "1rem" }}>
          <span className="user">John Smith</span>
        </Col>
        <Col
          span={24}
          style={{
            paddingBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "3rem",
          }}
        >
          <div className="avatar-container-profile">
            <FaRegUser className="avatar-profile" />
          </div>
        </Col>
        <Col span={24} style={{ paddingBottom: "1rem" }}>
          <span className="email">johnsmith@example.com</span>
        </Col>
        <Col span={24} style={{ paddingBottom: "1rem" }}>
          <Button className="user-logout-btn">Logout</Button>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div className="main">
      <div className="nav">
        <p>SPEAKIMAGE</p>
        <Popover
          className="user-popover"
          placement="bottom"
          content={content}
          trigger="click"
        >
          <div className="avatar-container">
            <FaRegUser className="avatar" />
          </div>
        </Popover>
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span style={{ fontWeight: "bold" }}>Hello, John!</span>
              </p>
              <p style={{ fontSize: "1.5rem" }}>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest Some Place To Visit In Kerala")
                }
              >
                <p>Suggest Some Place To Visit In Kerala </p>
                <div className="bulb-icon">
                  <FaRegLightbulb className="bulb" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat </p>
                <div className="bulb-icon">
                  <FaRegLightbulb className="bulb" />
                </div>
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("How to Create a Gyroscope using Disc?")
                }
              >
                <p>How to Create a Gyroscope using Disc?</p>
                <div className="bulb-icon">
                  <FaRegLightbulb className="bulb" />
                </div>
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    "Create a Script for the youtube video about coding "
                  );
                }}
              >
                <p>Create a Script for the youtube video about coding </p>
                <div className="bulb-icon">
                  <FaCode className="bulb" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {}}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <IoSend className="bulb" />
            </div>
          </div>
          <div className="bottom-info"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
