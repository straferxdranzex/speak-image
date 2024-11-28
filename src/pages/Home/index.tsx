import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import Typewriter from "typewriter-effect";
import avatarImg from "../../Assets/Images/avatar.png";

import Cookies from "js-cookie";
import logoLight from "../../Assets/svgs/logoLight.svg";
import logoDark from "../../Assets/svgs/logoDark.svg";
import responseLogo from "../../Assets/Images/chat-loader.png";
import responseAnimatedLogo from "../../Assets/Images/response-animation.gif";

import GradientSendIcon from "./GradientSendIcon";
import { FaRegCircleStop, FaUser } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { useTheme } from "../../lib/ThemeProvider";
import Sidebar from "./Sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";

import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DroppDown";

import ImageModal from "./ImageModal";
import { Link, useNavigate, useParams } from "react-router-dom";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

interface ApiResponse {
  data: {
    response: {
      text: string;
      flux_image: string;
      google_img: string;
      youtube_video: string;
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
      flux_image: string | null;
      google_img: string | null;
      youtube_video: string | null;
    };
    timestamp: string;
  }>;
  create_timestamp: string;
}

interface ChatEntry {
  prompt: string;
  response: string;
  loading: boolean;
  flux_image: string | null;
  google_img: string | null;
  youtube_video: string | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>("");
  const showScrollButton = useRef(false);
  const [extended, setExtended] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "Generating response..."
  );
  const [abortController, setAbortController] =
    useState<AbortController | null>(null); // State to hold the current controller

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme != "light";

  const { threadId: urlThreadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setExtended(!extended);
  };

  const handleImageClick = (image: string | null) => {
    if (image) {
      setModalImage(image);
    }
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    const current = chatContainerRef.current;
    const handleScroll = () => {
      if (!current) return;
      const isAtBottom =
        current.scrollHeight - current.scrollTop === current.clientHeight;
      showScrollButton.current = !isAtBottom;
    };

    current?.addEventListener("scroll", handleScroll);

    return () => {
      current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    const fetchUserData = async () => {
      const clientId = getCookie("userId");
      if (clientId) {
        try {
          // Clear state and show loading
          setChatHistory([]);
          setShowResults(false);
          setLoadingMessage("Loading data...");
          setThreadId(""); // Reset thread ID until new data is loaded

          // Fetch user information
          const userResponse = await axios.get(
            `https://api.speakimage.ai/api/get-user/${clientId}`,
            { withCredentials: true }
          );
          setUser(userResponse.data);

          // Fetch chats
          const chatsResponse = await axios.get<{ chats: ChatHistory[] }>(
            `https://api.speakimage.ai/api/get-user-chats/${clientId}`,
            { withCredentials: true }
          );
          const chats = chatsResponse.data.chats;

          if (chats.length > 0) {
            // Sort chats by timestamp (most recent first)
            const sortedChats = chats.sort(
              (a, b) =>
                new Date(b.create_timestamp).getTime() -
                new Date(a.create_timestamp).getTime()
            );
            setAllChats(sortedChats);

            // Set initial thread ID (from URL or default to the first chat)
            const initialThreadId = urlThreadId || sortedChats[0]._id;
            setThreadId(initialThreadId);

            if (!urlThreadId) {
              navigate(`/thread/${initialThreadId}`, { replace: true });
            }
          } else {
            setLoadingMessage("No chats available.");
          }
        } catch (error) {
          console.error("Error fetching user data or chats:", error);
          setLoadingMessage("Error loading data.");
        }
      }
    };

    fetchUserData();
  }, [urlThreadId]);

  useEffect(() => {
    if (allChats.length > 0 && threadId) {
      const chatIdToLoad = urlThreadId || threadId;
      const selectedChat = allChats.find((chat) => chat._id === chatIdToLoad);

      if (selectedChat) {
        loadChatHistory(chatIdToLoad);
      } else if (chatIdToLoad === "new") {
        // console.log("new chat");
      } else {
        console.error("Chat not found for ID:", chatIdToLoad);
      }
    }
  }, [urlThreadId, allChats]);

  // const initializeChatHistory = (
  //   chatId: string,
  //   selectedChat: ChatHistory | undefined
  // ) => {
  //   setShowResults(true);
  //   setActiveChatId(chatId);
  //   if (selectedChat) {
  //     setThreadId(chatId);
  //     const formattedEntries = selectedChat.conversation.map((entry) => ({
  //       prompt: entry.query,
  //       response: entry.response.text,
  //       loading: false,
  //       flux_image: entry.response.flux_image,
  //       google_img: entry.response.google_img,
  //       youtube_video: entry.response.youtube_video,
  //     }));
  //     setChatHistory(formattedEntries);
  //     scrollToBottom();
  //   }
  // };

  const loadChatHistory = (chatId: string) => {
    // Clear chat history and temporarily disable results to show loading state
    setChatHistory([]);
    setShowResults(false);
    setLoadingMessage("Loading new thread...");
    setActiveChatId(""); // Clear active chat ID while loading

    const selectedChat = allChats.find((chat) => chat._id === chatId);

    if (selectedChat) {
      setThreadId(chatId);

      // Format the new chat entries for the selected thread
      const formattedEntries = selectedChat.conversation.map((entry) => ({
        prompt: entry.query,
        response: entry.response.text,
        loading: false,
        flux_image: entry.response.flux_image,
        google_img: entry.response.google_img,
        youtube_video: entry.response.youtube_video,
      }));

      // Update state after loading is complete
      setChatHistory(formattedEntries);
      setShowResults(true);
      setActiveChatId(chatId); // Set active chat ID after data is loaded
      setLoadingMessage(""); // Clear the loading message
      scrollToBottom();
    } else {
      console.error("Chat not found for ID:", chatId);
      setLoadingMessage("Unable to load the thread.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const initiateNewChat = () => {
    setThreadId("");
    setChatHistory([]);
    setShowResults(false);
    setActiveChatId("");
    navigate("/thread/new", { replace: true }); // Navigate to a "new chat" route
  };

  const handleSubmit = async (): Promise<void> => {
    if (!prompt?.trim()) return;

    const newEntry: ChatEntry = {
      prompt: prompt,
      response: "",
      loading: true,
      flux_image: null,
      google_img: null,
      youtube_video: null,
    };

    setChatHistory((prevHistory) => [...prevHistory, newEntry]);
    setShowResults(true);
    setPrompt("");
    setLoadingMessage("Generating response...");

    const controller = new AbortController();
    setAbortController(controller);

    const timer = setTimeout(() => {
      setLoadingMessage("Almost there...");
    }, 10000);

    try {
      const clientId = getCookie("userId");
      if (!clientId) {
        console.error("User ID not found");
        return;
      }

      let response: ApiResponse;

      if (!threadId || threadId === "new") {
        // Create a new thread
        response = await axios.post(
          "https://api.speakimage.ai/api/init-chat",
          {
            query: prompt,
            user_id: user?.user_id || clientId,
          },
          { withCredentials: true, signal: controller.signal }
        );

        if (response.data.thread_id) {
          const newThreadId = response.data.thread_id;
          setThreadId(newThreadId);
          navigate(`/thread/${newThreadId}`, { replace: true }); // Redirect to the new thread URL

          // Add the new chat to the list of chats
          const newChat: ChatHistory = {
            _id: newThreadId,
            user_id: user?.user_id || clientId,
            title: prompt.split(" ").slice(0, 5).join(" "),
            conversation: [
              {
                query: prompt,
                response: {
                  text: "",
                  flux_image: null,
                  google_img: null,
                  youtube_video: null,
                },
                timestamp: new Date().toISOString(),
              },
            ],
            create_timestamp: new Date().toISOString(),
          };

          setAllChats((prevChats) => [newChat, ...prevChats]);
        }
      } else {
        // Continue in an existing thread
        response = await axios.post(
          "https://api.speakimage.ai/api/generate-answer",
          { query: prompt, thread_id: threadId, user_id: user?.user_id || clientId, },
          { withCredentials: true, signal: controller.signal }
        );
      }

      clearTimeout(timer);

      // Update the chat history
      setChatHistory((prevHistory) =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? {
                ...entry,
                response: response.data.response.text,
                flux_image: response.data.response.flux_image,
                google_img: response.data.response.google_img,
                youtube_video: response.data.response.youtube_video,
                loading: false,
              }
            : entry
        )
      );
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching response:", error);
      }
      clearTimeout(timer);

      setChatHistory((prevHistory) =>
        prevHistory.map((entry, index) =>
          index === prevHistory.length - 1
            ? {
                ...entry,
                response: "Try again...",
                loading: false,
              }
            : entry
        )
      );
    } finally {
      setAbortController(null);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    const current = chatContainerRef.current;
    if (current) {
      current.scrollTop = current.scrollHeight;
      setIsAtBottom(true);
    }
  };

  const handleStopClick = () => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
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

  const { firstName, lastName } = getNameParts(user?.full_name || "My Account");

  useEffect(() => {
    document.title = "Dashboard | Speakimage";
  }, []);

  return (
    <section
      className="font-segoe h-screen w-full flex relative"
      role="region"
      aria-label="main-dashboard"
    >
      {/* Modal to display full-sized image */}
      {modalImage !== null && (
        <ImageModal imageUrl={modalImage} onClose={closeModal} />
      )}

      <Sidebar
        extended={extended}
        toggle={toggleNavbar}
        initiateNewChat={initiateNewChat}
        aria-label="Sidebar navigation"
      >
        <div className="muteScroll overflow-y-auto overflow-x-hidden flex-grow rounded-xl flex flex-col gap-1 w-full">
          {allChats.map((chat) => {
            return (
              <Link
                key={chat._id}
                className={`${
                  chat._id === activeChatId ? "text-foreground" : ""
                } text-text-light relative px-2 py-1.5 flex w-full items-center rounded-md transition-colors text-sm  hover:text-foreground`}
                role="button"
                tabIndex={0}
                to={`/thread/${chat._id}`}
                aria-label={`Load chat titled ${chat.title}`}
              >
                <IoChatboxOutline />
                <span
                  className="pl-2 truncate w-full text-left"
                  aria-label={chat.title}
                >
                  {chat.title}
                </span>
              </Link>
            );
          })}
        </div>
      </Sidebar>

      <main
        className="max-sm:ml-[3.5rem] flex-grow h-screen relative bg-card flex flex-col"
        aria-labelledby="main-content"
        id="main-content"
      >
        <div className="flex-grow h-fit overflow-y-auto" ref={chatContainerRef}>
          <div className="bg-card flex justify-between sm:p-2 sticky top-0 w-full z-10">
            <img
              src={isDark ? logoLight : logoDark}
              alt="speakimage logo"
              className="w-auto h-16"
            />
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    className="cursor-pointer m-4"
                    aria-label="User Avatar"
                    tabIndex={0} // Make Avatar focusable with keyboard
                    role="button" // Optional: Define role for better accessibility
                  >
                    <AvatarImage
                      src={avatarImg}
                      alt={`User profile picture of ${firstName}`}
                    />
                    <AvatarFallback>
                      {firstName?.slice(0, 1)}
                      {lastName?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 shadow-lg bg-card-2 border-card-hover"
                >
                  <DropdownMenuLabel>
                    <div className="h-48 flex flex-col justify-center items-center text-center gap-4">
                      <Avatar className="size-20">
                        <AvatarImage
                          src={avatarImg}
                          alt={`User profile picture of ${firstName}`}
                        />
                        <AvatarFallback>
                          {firstName?.slice(0, 1)}
                          {lastName?.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <p
                        className="leading-none"
                        aria-label={`${firstName} ${lastName}`}
                      >
                        {firstName} {lastName}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="py-3 rounded-md"
                    role="button"
                    aria-label="Log out"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {!showResults ? (
            <div className="font-segoe mx-auto my-14 text-4xl sm:text-6xl text-text-light font-medium w-[75%] sm:w-[80%] xl:w-1/2">
              <h1>
                <span className="font-bold bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent font-outfit leading-normal">
                  Hello, {user?.full_name.split(" ")[0]}!
                </span>
              </h1>
              <p className="text-base md:text-xl">How can I help you today?</p>
            </div>
          ) : (
            <div
              className="pb-4 ml-auto mr-6 sm:mr-auto sm:ml-auto mb-14 mt-2 text-6xl text-text font-medium w-[calc(100%-5rem)] sm:w-[80%] xl:w-1/2 relative"
              role="region"
              aria-label="chat-history"
            >
              <div className="w-full h-full">
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    <div className="chat-entry">
                      {/* Prompt */}
                      <div className="flex items-start gap-2 font-normal -ml-9 sm:-ml-14 sm:mb-8 mb-5 text-text leading-normal">
                        <div className="size-[1.6rem] sm:size-8 -ml-px sm:ml-px rounded-full opacity-70 bg-black/30 dark:bg-white/30 grid place-content-center text-text">
                          <FaUser className="text-xs" aria-hidden="true" />
                        </div>
                        <span className="opacity-90 pl-0.5 sm:pl-3.5 pt-0.5 text-sm text-text leading-[1.8]">
                          {chat.prompt}
                        </span>
                      </div>

                      <div className="text-base mb-5 sm:mb-12 flex flex-col gap-6 leading-normal relative">
                        <img
                          src={
                            chat.loading ? responseAnimatedLogo : responseLogo
                          }
                          loading="eager"
                          className="size-10 sm:size-12 absolute -top-2 sm:-top-3 -left-11 sm:-left-16"
                          alt="speakimage logo"
                        />
                        {chat.loading ? (
                          <div className="flex">
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
                        ) : (
                          <>
                            {(chat.flux_image || chat.google_img) && (
                              <div className="flex max-sm:flex-col gap-4">
                                {/* flux_image */}
                                {chat.flux_image && (
                                  <div className="sm:w-1/2 aspect-[1.1] overflow-hidden rounded-sm">
                                    <img
                                      src={chat.flux_image}
                                      onClick={() =>
                                        handleImageClick(chat.flux_image)
                                      }
                                      alt="Flux Response Visual"
                                      className="cursor-pointer bg-card-2 text-xs w-full h-full object-cover block"
                                    />
                                  </div>
                                )}
                                {/* Pixabay Image */}
                                {chat.google_img && (
                                  <div className="sm:w-1/2 aspect-[1.1] overflow-hidden rounded-sm">
                                    <img
                                      src={chat.google_img}
                                      onClick={() =>
                                        handleImageClick(chat.google_img)
                                      }
                                      alt="Google Response Visual"
                                      className="cursor-pointer bg-card-2 text-xs w-full h-full object-cover block"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                            {/* youtube video */}
                            {chat.youtube_video && (
                              <div className="w-full">
                                <iframe
                                  src={`https://www.youtube.com/embed/${chat.youtube_video.split('v=')[1]?.split('&')[0]}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="bg-card-2 w-full h-auto aspect-video"
                                  aria-label="YouTube video"
                                ></iframe>
                                {/* <video
                                  src={chat.youtube_video}
                                  controls
                                  className="bg-card-2 w-full h-auto"
                                  aria-label="youtube video"
                                /> */}
                              </div>
                            )}
                            {/* Response */}
                            <div
                              className="leading-[1.8] text-sm w-full"
                              aria-label="Response Text"
                            >
                              <Markdown>{chat.response}</Markdown>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Distance between the Chats */}
                    {index !== chatHistory.length - 1 && (
                      <div className="w-20 h-6"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              {showScrollButton.current && !isAtBottom && (
                <div
                  tabIndex={0}
                  role="button"
                  className={`${
                    extended ? "sm:ml-[7.9rem]" : "sm:ml-[2.25rem]"
                  } transition-all duration-300 fixed size-8 left-[calc(50%+1.75rem)] sm:left-1/2 rounded-full bg-card-2 flex justify-center items-center bottom-28 pointer z-50 -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                >
                  <FaLongArrowAltDown
                    onClick={scrollToBottom}
                    className="text-base"
                    aria-hidden="true"
                    aria-label="Scroll down arrow"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-2 bg-card bottom-0 w-full px-5 flex flex-col items-center">
          <div className="flex max-sm:flex-wrap items-center sm:gap-5 bg-card-2 rounded-full py-1 sm:py-2.5 px-2 sm:px-5 mb-1 w-full sm:w-[80%] xl:w-1/2">
            <input
              className="disabled:opacity-50 flex-shrink-0 flex-1 bg-transparent border-0 outline-none p-2 text-base sm:text-lg text-foreground placeholder-text-light min-w-24"
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              value={prompt}
              placeholder={
                chatHistory.some((chat) => chat.loading)
                  ? "Please wait"
                  : "Enter the Prompt Here"
              }
              aria-label="Chat input"
              disabled={chatHistory.some((chat) => chat.loading)}
            />
            {chatHistory.some((chat) => chat.loading) ? (
              <div
                onClick={handleSubmit}
                aria-label="Send Message"
                role="button"
                tabIndex={0}
                className="cursor-pointer px-2 relative size-6 sm:size-8 mr-2"
              >
                {chatHistory.map(
                  (chat, index) =>
                    chat.loading && (
                      <button
                        key={index}
                        onClick={handleStopClick}
                        className="absolute inset-0 z-10 flex items-center justify-center bg-card-2 cursor-pointer"
                        aria-label="Stop Loading"
                        role="button"
                        tabIndex={0}
                      >
                        <FaRegCircleStop className="text-text sm:text-lg" />
                      </button>
                    )
                )}
              </div>
            ) : (
              <div
                onClick={handleSubmit}
                aria-label="Send Message"
                role="button"
                tabIndex={0}
                className="cursor-pointer px-2 relative"
              >
                <GradientSendIcon />
              </div>
            )}
          </div>
          <p className="py-4 text-[0.65rem] sm:text-xs leading-4 text-center font-light text-text">
            Consider checking important information, AI can make mistakes.
            Speakimage AI Beta Testing Version.
          </p>
        </div>
      </main>
    </section>
  );
};

export default HomeLayout;
