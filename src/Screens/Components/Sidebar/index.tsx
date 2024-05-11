import "./index.css";
import { assets } from "../../../Assets/assets/assets";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdHelpCircle } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const loadPreviousPrompt = async (prompt: any) => {};

  const prevPrompts: any[] = ["Suggest Some Place To Visit In Kochi"];

  return (
    <div className="sidebar" style={{ width: extended ? "300px" : "80px" }}>
      <div className="top">
        <GiHamburgerMenu
          className="menu"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        />

        <div className="new-chat">
          <IoIosAdd className="newchat-icon" />

          {extended ? <p className="newchat-text">New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item: any, index: any) => {
              return (
                <div
                  onClick={() => {
                    loadPreviousPrompt(item);
                  }}
                  className="recent-entry"
                >
                  <IoChatbubbleEllipsesOutline className="recent-icon" />
                  <p className="recent-text">{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <IoMdHelpCircle className="bottom-icon" />

          {extended ? <p className="bottom-text">Help</p> : null}
        </div>
        <div className="bottom-item recent-entry" style={{ marginTop: "1rem", marginBottom: "1rem"}}>
          <IoMdSettings className="bottom-icon" />

          {extended ? <p className="bottom-text">Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
