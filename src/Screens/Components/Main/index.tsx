import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { FaRegUser } from "react-icons/fa";
import { Button, Card, Col, Popover, Row, Spin } from "antd";
import { FaUser } from "react-icons/fa6";
import Cookies from "js-cookie";
import GradientSendIcon from "../GradientSendIcon";
import { IoIosAdd } from "react-icons/io";
import { TfiControlForward } from "react-icons/tfi";
import Markdown from "react-markdown";
import Typewriter from "typewriter-effect";
import { Tooltip } from "antd";


const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

interface ApiResponse {
  data: {
    response: {
      text: string;
      dalle_image: string;
      pixabay_img: string;
      pixabay_video: string;
    };
    thread_id?: string;
  };
}

interface ChatHistory {
  _id: string;
  user_id: string;
  title: string;
  conversation: Array<{
    query: string;
    response: {
      text: string;
      dalle_image: string | null;
      pixabay_img: string | null;
      pixabay_video: string | null;
      timestamp: string;
    };
  }>;
  create_timestamp: string;
}

interface ChatEntry {
  prompt: string;
  response: string;
  loading: boolean;
  image: string | null;
  imagex: string | null;
  video: string | null;
}

interface Thread {
  _id: string;
  query: string;
}

interface User {
  user_id: string;
  email: string;
  full_name: string;
}

const Main = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [threadId, setThreadId] = useState("");
  const [allThreads, setAllThreads] = useState<Thread[]>([]);
  const [allChats, setAllChats] = useState<ChatHistory[]>([]);
  const [extended, setExtended] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Generating response...");
  const [user, setUser] = useState<User | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
  const clientId = getCookie("userId");
  if (clientId) {
    try {
      const response = await axios.get(`https://api.speakimage.ai/api/get-user/${clientId}`, { withCredentials: true });
      setUser(response.data);

      // Fetch chat history for the user
      const chatsResponse = await axios.get<ChatHistory[]>(`https://api.speakimage.ai/api/get-user-chats/${clientId}`, { withCredentials: true });
      setAllChats(chatsResponse.data);
    } catch (error) {
      console.error("Error fetching user data or chats:", error);
    }
  }
};


    fetchUserData();
  }, []);

  
  const loadChatHistory = (chatId: string) => {
    setShowResults(true);
    setActiveChatId(chatId);
    const selectedChat = allChats.find(chat => chat._id === chatId);
    if (selectedChat) {
      setThreadId(chatId); 
      const formattedEntries = selectedChat.conversation.map(entry => ({
        prompt: entry.query,
        response: entry.response.text,
        loading: false,
        image: entry.response.dalle_image,
        imagex: entry.response.pixabay_img,
        video: entry.response.pixabay_video
      }));
      setChatHistory(formattedEntries);
    }
  };
  
  const handleCardClick = (promptText: string) => {
    setShowResults(true);
    setPrompt(promptText);
  };

  const handleInputChange = (e: any) => setPrompt(e.target.value);

  const initiateNewChat = async () => {
    setThreadId("");
    setChatHistory([]);
    setShowResults(false);
  };

const handleSubmit = async (): Promise<void> => {
  if (!prompt?.trim()) return;

  const newEntry: ChatEntry = {
    prompt: prompt,
    response: "",
    loading: true,
    image: null,
    imagex: null,
    video: null,
  };

  setChatHistory((prevHistory) => [...prevHistory, newEntry]);
  setShowResults(true);
  setPrompt("");
  setLoadingMessage("Generating response...");

  const timer = setTimeout(() => {
    setLoadingMessage("Almost there...");
  }, 10000);

  try {
    let response: ApiResponse;
    const clientId = getCookie("userId");
    if (!clientId) {
      console.error("User ID not found");
      return;
    }

    if (!threadId) {
      response = await axios.post("https://api.speakimage.ai/api/init-chat", {
        query: prompt,
        user_id: user?.user_id || clientId,
      }, { withCredentials: true });
      if (response.data.thread_id) {
        setThreadId(response.data.thread_id);
      }
    } else {
      response = await axios.post(
        "https://api.speakimage.ai/api/generate-answer",
        { query: prompt, thread_id: threadId }, { withCredentials: true }
      );
    }

    clearTimeout(timer);
    setChatHistory((prevHistory) =>
      prevHistory.map((entry, index) =>
        index === prevHistory.length - 1
          ? {
              ...entry,
              response: response.data.response.text,
              image: response.data.response.dalle_image,
              imagex: response.data.response.pixabay_img,
              video: response.data.response.pixabay_video,
              loading: false,
            }
          : entry
      )
    );
  } catch (error) {
    clearTimeout(timer);
    console.error("Error fetching response:", error);
    setChatHistory((prevHistory) =>
      prevHistory.map((entry, index) =>
        index === prevHistory.length - 1
          ? { ...entry, response: "Error loading response", loading: false }
          : entry
      )
    );
  }
};

  const logout = () => {
    Cookies.remove("userId");
    Cookies.remove("userToken");
    window.location.href = "/login";
};

  const content = (
    
    <Card className="profile-card">
      <Row>
        <Col span={24} style={{ paddingBottom: "1rem" }}>
          <span className="user">{user?.full_name}</span>
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
          <span className="email">{user?.email}</span>
        </Col>
        <Col span={24} style={{ paddingBottom: "1rem" }}>
          <Button className="user-logout-btn" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Card>
  );

  return (
    <>
      {/* Navbar */}
      <nav className={extended ? "navbar-clicked" : "navbar"}>
        <ul className="navbar-nav">
          <li className="logo" onClick={() => setExtended(!extended)}>
            <span className="nav-link">
              <TfiControlForward
                width={"32px"}
                height={"32px"}
                className="logo-icon"
              />
            </span>
          </li>
          <li className="nav-item">
            <Button className="nav-btn" onClick={initiateNewChat}>
              <IoIosAdd className="nav-btn-icon" />
              <span className="nav-btn-text">New Chat</span>
            </Button>
          </li>
          <li className="nav-item-recent">
            <span className="nav-recent-heading">Recent Chats</span>
          </li>
          <div className="nav-recent-chats-container">
            <div className="nav-recent-chats">
            {allChats.map(chat => (
                <li key={chat._id} className={chat._id === activeChatId ? "nav-item-clicked" : "nav-item"} onClick={() => loadChatHistory(chat._id)}>
                  <span className="nav-recent-heading">{chat.title}</span>
                </li>
              ))}
            </div>
            
            <Tooltip placement="right" title="Coming Soon">
              <li className="nav-item-help">
              <a href="#" className="nav-link">
                <svg
                  width="28px"
                  height="28px"
                  stroke="var(--text-color)"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke-width="2"
                      className="icon-primary-color"
                      stroke="var(--text-color)"
                    ></path>{" "}
                    <path
                      d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.9337 13.3601 11.718 12.4949 11.9383C12.2273 12.0064 12 12.2239 12 12.5V12.5V13"
                      className="icon-secondary-color"
                      stroke="var(--text-color)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M12 16H12.01"
                      className="icon-secondary-color"
                      stroke="var(--text-color)"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="link-text">Help</span>
              </a>
            </li>
            </Tooltip>
            <Tooltip placement="right" title="Coming Soon">
            <li className="nav-item-settings">
              <a href="#" className="nav-link">
                <svg
                  width="28px"
                  height="28px"
                  stroke="var(--text-color)"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="var(--text-color)"
                      stroke-width="1.5"
                      className="icon-primary-color"
                    ></circle>{" "}
                    <path
                      d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                      stroke="var(--text-color)"
                      stroke-width="1.5"
                      className="icon-secondary-color"
                    ></path>{" "}
                  </g>
                </svg>
                <span className="link-text">Settings</span>
              </a>
            </li>
            </Tooltip>
          </div>
        </ul>
      </nav>
      {/* Content Container  */}
      <div
        className="main-full-container"
        style={extended ? { marginLeft: "16rem" } : { marginLeft: "5rem" }}
      >

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="logo-main">
            <p>SPEAKIMAGE</p>
          </div>
          {/* AVATAR CONTAINER */}
          <div className="user-avatar-container">
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
        </div>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Chat Container */}
          <Col span={24} md={24} lg={24} xl={24} className="main-content-col">
            <div className="main">
              <div className="main-container">
                {!showResults ? (
                  // Chat Container without having prompts and responses (Greeting Text)
                  <div className="greet-container">
                    <div className="greet">
                      <p>
                        <span style={{ fontWeight: "bold" }}>Hello, {user?.full_name.split(' ')[0]}!</span>
                      </p>
                      <p style={{ fontSize: "1.5rem" }}>
                        How can I help you today?
                      </p>
                    </div>
                  </div>
                ) : (
                  // Chat Container with prompts and responses
                  <div className="result">
                    <div className="result-container" style={{}}>
                      {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                          <div className="chat-entry">
                            <span
                              style={{
                                fontWeight: "normal",
                                fontSize: "1.2rem",
                                color: "gray",
                                marginLeft: "-2rem",
                              }}
                            >
                              <FaUser
                                style={{
                                  marginRight: "0.5rem",
                                  fontWeight: "bold",
                                  fontSize: "1rem",
                                }}
                              />{" "}
                              You
                            </span>
                            {/* Prompt */}
                            <p
                              className="prompt"
                              style={{
                                fontWeight: "normal",
                                fontSize: "1.2rem",
                                color: "var(--text-color)",
                                marginBottom: "1rem",
                                marginTop: "1rem",
                              }}
                            >
                              <span className="response-text">{chat.prompt}</span>
                            </p>
                            <span
                              style={{
                                fontWeight: "normal",
                                fontSize: "1.2rem",
                                color: "gray",
                                marginLeft: "-2rem",
                              }}
                            >
                              <FaUser
                                style={{
                                  marginRight: "0.5rem",
                                  fontWeight: "bold",
                                  fontSize: "1rem",
                                }}
                              />{" "}
                              SpeakImage <br />
                            </span>
                            {/* Loader */}
                            {chat.loading ? (
                                  <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    fontSize: "1rem",
                                    color: "var(--text-color)",
                                    marginTop: "1rem",
                                  }}
                                  >
                                    <div>
                                      <Spin
                                        style={{
                                          width: "2rem",
                                          height: "2rem",
                                        }}
                                      />
                                    </div>
                                    <div style={{ marginLeft: "1rem" }}>
                                      <Typewriter
                                        options={{
                                          strings: [loadingMessage],
                                          autoStart: true,
                                          loop: true,
                                          delay: 50,
                                          cursor: "|",
                                        }}
                                      />
                                    </div>
                                  </div>
                            ) : (
                              <>
                                {/* Dalle Image */}
                                <Row gutter={[16, 16]}>
                                  {chat.image && (
                                  <Col span={24} lg={12} style={{ paddingBottom: "2rem", paddingTop: "1rem" }}>
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "22rem",
                                    }}
                                  >
                                    <img
                                      src={chat.image}
                                      alt="Response Visual"
                                      style={{
                                        width: "100%",
                                        height: "22rem",
                                      }}
                                    />
                                  </div>
                                  </Col>
                                )}
                                  {/* Pixabay Image */}
                                {chat.imagex && (
                                  <Col span={24} lg={12} style={{ paddingBottom: "2rem", paddingTop: "1rem" }}>
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "22rem",
                                    }}
                                  >
                                    <img
                                      src={chat.imagex}
                                      alt="Response Visual"
                                      style={{
                                        width: "100%",
                                        height: "22rem",
                                      }}
                                    />
                                  </div>
                                  </Col>
                                )}
                                </Row>
                                
                                {/* Pixabay Video */}
                                {chat.video && (
                                  <video
                                    src={chat.video}
                                    controls
                                    style={{ width: "100%" }}
                                  />
                                )}
                                {/* Response */}
                                <div
                                  className="response"
                                  style={{
                                    fontWeight: "normal",
                                    fontSize: "1.2rem",
                                    color: "var(--text-color)",
                                    marginTop: "1rem",
                                    marginBottom: "1.5rem",
                                  }}
                                >
                                  <span className="response-text">
                                    <Markdown>{chat.response}</Markdown>
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          {/* Distance between the Chats */}
                          {index !== chatHistory.length - 1 && (
                            <div
                              style={{ width: "5rem", height: "2rem" }}
                            ></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
                {/* Input Field Container */}
                <div className="main-bottom">
                  <div className="search-box">
                    <input
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      value={prompt}
                      placeholder="Enter the Prompt Here"
                    />
                    <div onClick={handleSubmit} className="icon-container">
                      <GradientSendIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Main;
