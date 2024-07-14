import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./index.css";
import { FaRegUser } from "react-icons/fa";
import { Button, Card, Col, Dropdown, Image, Menu, Row, Space } from "antd";
import { FaUser } from "react-icons/fa6";
import Cookies from "js-cookie";
import GradientSendIcon from "../GradientSendIcon";
import { IoIosAdd } from "react-icons/io";
import { TfiControlForward } from "react-icons/tfi";
import Markdown from "react-markdown";
import Typewriter from "typewriter-effect";
import { Tooltip } from "antd";
import { TbArrowDownCircle } from "react-icons/tb";
import useLocalStorage from "use-local-storage";
import avatar from "../../../Assets/Images/avatar.png";
import logoLight from "../../../Assets/svgs/logoLight.svg";
import logoDark from "../../../Assets/svgs/logoDark.svg";
import { MdOutlineMenu } from "react-icons/md";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import responseLogo from "../../../Assets/Images/chat-loader.png";
import responseAnimatedLogo from "../../../Assets/Images/response-animation.gif";
import { IoChatboxOutline } from "react-icons/io5";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
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

const HomeLayout = () => {
  const [prompt, setPrompt] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [threadId, setThreadId] = useState("");
  const [allChats, setAllChats] = useState<ChatHistory[]>([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Generating response..."
  );
  const [user, setUser] = useState<User | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false);
  const [extended, setExtended] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth <= 700) {
      setExtended(false); // Collapse the navbar and prevent expansion
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => {
    if (windowWidth > 700) {
      setExtended(!extended);
    }
  };

  useEffect(() => {
    const current = chatContainerRef.current;
    const handleScroll = () => {
      if (!current) return;
      const isAtBottom =
        current.scrollHeight - current.scrollTop === current.clientHeight;
      setShowScrollButton(!isAtBottom);
    };

    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    const current = chatContainerRef.current;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const clientId = getCookie("userId");
      if (clientId) {
        try {
          const response = await axios.get(
            `https://api.speakimage.ai/api/get-user/${clientId}`,
            { withCredentials: true }
          );
          setUser(response.data);
          const chatsResponse = await axios.get<ChatHistory[]>(
            `https://api.speakimage.ai/api/get-user-chats/${clientId}`,
            { withCredentials: true }
          );
          const sortedChats = chatsResponse.data.sort(
            (a, b) =>
              new Date(b.create_timestamp).getTime() -
              new Date(a.create_timestamp).getTime()
          );
          setAllChats(sortedChats);
          if (sortedChats.length > 0) {
            // setActiveChatId(sortedChats[0]._id);
          }
        } catch (error) {
          console.error("Error fetching user data or chats:", error);
        }
      }
    };

    fetchUserData();
  }, [allChats]);

  const loadChatHistory = (chatId: string) => {
    setShowResults(true);
    setActiveChatId(chatId);
    const selectedChat = allChats.find((chat) => chat._id === chatId);
    if (selectedChat) {
      setThreadId(chatId);
      const formattedEntries = selectedChat.conversation.map((entry) => ({
        prompt: entry.query,
        response: entry.response.text,
        loading: false,
        image: entry.response.dalle_image,
        imagex: entry.response.pixabay_img,
        video: entry.response.pixabay_video,
      }));
      setChatHistory(formattedEntries);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

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
        response = await axios.post(
          "https://api.speakimage.ai/api/init-chat",
          {
            query: prompt,
            user_id: user?.user_id || clientId,
          },
          { withCredentials: true }
        );
        if (response.data.thread_id) {
          setThreadId(response.data.thread_id);
        }
      } else {
        response = await axios.post(
          "https://api.speakimage.ai/api/generate-answer",
          { query: prompt, thread_id: threadId },
          { withCredentials: true }
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
            ? {
                ...entry,
                response:
                  "Error loading response. Please check your internet connection or try again.",
                loading: false,
              }
            : entry
        )
      );
    }
  };

  const logout = () => {
    Cookies.remove("userId");
    Cookies.remove("userToken");
    window.location.href = "/get-started";
  };

  const getNameParts = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    const firstName = parts.shift();
    const lastName = parts.join(" ");
    return { firstName, lastName };
  };

  const { firstName, lastName } = getNameParts(user?.full_name || "");

  return (
    <>
      {/* Navbar */}
      <nav className={extended ? "navbar-clicked" : "navbar"}>
        <div className="nav-icon-container" onClick={toggleNavbar}>
          <MdOutlineMenu className="nav-icon" />
        </div>
        <div className="nav-new-chat-button">
          <button type="button" className="nav-btn" onClick={initiateNewChat}>
            <IoIosAdd className="nav-btn-icon" />
            <span className="nav-btn-text">New Chat</span>
          </button>
        </div>
        <div className="nav-recent-chat-heading-container">
          <span className="nav-recent-heading">Recent</span>
        </div>
        <div className="nav-recent-chats-container">
          <div className="nav-chat-inner-container">
            {allChats.map((chat) => (
              <div
                key={chat._id}
                className={
                  chat._id === activeChatId
                    ? "nav-chat-clicked"
                    : "nav-chat-normal"
                }
                onClick={() => loadChatHistory(chat._id)}
              >
                <span>
                  <IoChatboxOutline
                    className="nav-chat-icon"
                    style={{ fontSize: "1.2rem" }}
                  />
                </span>
                <span>{chat.title}...</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nav-bottom">
          <Tooltip placement="right" title="Coming Soon">
            <div className="nav-bottom-container">
              <Space>
                <HiMiniExclamationCircle className="nav-bottom-icon" />
                <span className="nav-bottom-text">Help</span>
              </Space>
            </div>
          </Tooltip>
          <Tooltip placement="right" title="Coming Soon">
            <div className="nav-bottom-container">
              <Space>
                <FaRegClock className="nav-bottom-icon" />
                <span className="nav-bottom-text">Activity</span>
              </Space>
            </div>
          </Tooltip>
          <Tooltip placement="right" title="Coming Soon">
            <div className="nav-bottom-container">
              <Space>
                <MdOutlineSettings className="nav-bottom-icon" />
                <span className="nav-bottom-text">Settings</span>
              </Space>
            </div>
          </Tooltip>
        </div>
      </nav>
      {/* Content Container  */}
      <div
        className="main-full-container"
        style={extended ? { marginLeft: "16rem" } : { marginLeft: "5rem" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="logo-main">
            <img
              src={isDark ? logoLight : logoDark}
              alt=""
              width="250px"
              height="70px"
            />
          </div>
          {/* AVATAR CONTAINER */}
          <div className="user-avatar-container">
            <Dropdown
              className="profile-dropdown"
              overlay={
                <Menu className={isDark ? "profile-menu-dark" : "profile-menu"}>
                  <Menu.Item
                    key="profile"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <div
                      className={isDark ? "profile-card-dark" : "profile-card"}
                    >
                      <Row>
                        <Col
                          span={24}
                          style={{
                            paddingBottom: "3rem",
                          }}
                        >
                          <img src={avatar} alt="Avatar" />
                        </Col>
                        <Col
                          span={24}
                          style={{
                            paddingBottom: "1rem",
                          }}
                        >
                          <span className="user">{firstName}</span>
                          <br />
                          <span className="user">{lastName}</span>
                        </Col>

                        <Col span={24}>
                          <Button
                            className={
                              isDark
                                ? "user-logout-btn-dark"
                                : "user-logout-btn"
                            }
                            onClick={logout}
                          >
                            LOGOUT
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
            >
              <div className="avatar-container">
                <FaRegUser className="avatar" />
              </div>
            </Dropdown>
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
                        <span style={{ fontWeight: "bold" }}>
                          Hello, {user?.full_name.split(" ")[0]}!
                        </span>
                      </p>
                      <p className="greet-text">
                        How can I help you today?
                      </p>
                    </div>
                  </div>
                ) : (
                  // Chat Container with prompts and responses
                  <div
                    className="result"
                    ref={chatContainerRef}
                    style={{ position: "relative" }}
                  >
                    <div className="result-container" style={{}}>
                      {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                          <div className="chat-entry">
                            {/* Prompt */}

                            <div
                              style={{
                                fontWeight: "normal",
                                fontSize: "1rem",
                                marginLeft: "-3rem",
                                marginBottom: "2.5rem",
                                color: "var(--text-color)",
                                lineHeight: "1.5rem",
                              }}
                            >
                              <FaUser
                                style={{
                                  marginRight: "1.5rem",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                }}
                              />{" "}
                              <span className="response-text">
                                {chat.prompt}
                              </span>
                            </div>

                            <div
                              style={{
                                fontWeight: "normal",
                                fontSize: "1rem",
                                marginBottom: "3rem",
                                color: "var(--text-color)",
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: "1.5rem",
                                position: "relative",
                              }}
                            >
                              <img
                                src={
                                  chat.loading
                                    ? responseAnimatedLogo
                                    : responseLogo
                                }
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  position: "absolute",
                                  top: "-1rem",
                                  left: "-4rem",
                                }}
                                alt=""
                              />{" "}
                              {/* Loader */}
                              {chat.loading ? (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div>
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
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "1rem",
                                      marginBottom: "1rem",
                                    }}
                                  >
                                    {/* Dalle Image */}
                                    {chat.image && (
                                      <div className="image-container">
                                        <Image
                                          src={chat.image}
                                          alt="Response Visual"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "0.2rem",
                                          }}
                                        />
                                      </div>
                                    )}
                                    {/* Pixabay Image */}
                                    {chat.imagex && (
                                      <div className="image-container">
                                        <Image
                                          src={chat.imagex}
                                          alt="Response Visual"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                            borderRadius: "0.2rem",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  {/* Pixabay Video */}
                                  {chat.video && (
                                    <div
                                      style={{
                                        marginTop: "1rem",
                                        width: "100%",
                                        marginBottom: "2rem",
                                      }}
                                    >
                                      <video
                                        src={chat.video}
                                        controls
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                  )}
                                  {/* Response */}
                                  <div
                                    className="response"
                                    style={{
                                      fontFamily: "Poppins",
                                      fontWeight: "normal",
                                      fontSize: "1.2rem",
                                      color: "var(--text-color)",
                                      marginBottom: "1.5rem",
                                      width: "100%",
                                      marginTop: "-1rem",
                                    }}
                                  >
                                    <span className="response-text">
                                      <Markdown>{chat.response}</Markdown>
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {/* Distance between the Chats */}
                          {index !== chatHistory.length - 1 && (
                            <div
                              style={{ width: "5rem", height: "0.5rem" }}
                            ></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    {showScrollButton && (
                      <div className="scroll-down-button-container">
                        <TbArrowDownCircle
                          onClick={scrollToBottom}
                          className="scroll-down-button "
                        />
                      </div>
                    )}
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

export default HomeLayout;
