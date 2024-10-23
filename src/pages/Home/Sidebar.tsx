import React from "react";
import { MdOutlinePeopleAlt, MdOutlineSettings } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { TbBrightnessDown } from "react-icons/tb";
import { PiMoon } from "react-icons/pi";
import { Option, ToggleClose } from "./SidebarOptions";
import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "../../lib/ThemeProvider";

const sidebarVariants = {
  open: { width: "16rem" },
  closed: { width: "4.7rem" },
};

const sidebarVariantsMob = {
  open: { width: "14rem" },
  closed: { width: "3.5rem" },
};

interface SidebarProps {
  extended: boolean;
  toggle?: () => void;
  initiateNewChat?: () => void;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  extended,
  toggle,
  initiateNewChat,
  children,
}: any) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <motion.nav
        className={`max-sm:absolute left-0 z-[500] h-full shrink-0 bg-card-2 text-foreground flex flex-col justify-between p-1 sm:px-3.5 py-4 gap-2 overflow-hidden`}
        initial={extended ? "open" : "closed"}
        animate={extended ? "open" : "closed"}
        variants={
          window.innerWidth < 640 ? sidebarVariantsMob : sidebarVariants
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-label="Sidebar Navigation"
      >
        {/* Toggle Button for Opening and Closing Sidebar */}
        <ToggleClose
          open={extended}
          setOpen={toggle}
        />

        {/* Option: New Chat */}
        <Option
          highlight
          Icon={IoIosAdd}
          title="New Chat"
          open={extended}
          onClick={initiateNewChat}
          aria-label="Start a New Chat"
        />

        <AnimatePresence>
          <div className="flex-grow flex overflow-hidden" id="sidebar-content">
            {extended && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap w-full py-2 flex-grow flex flex-col gap-2"
              >
                <p
                  className="p-1 text-sm dark:text-primary-100 text-foreground"
                  aria-hidden="true"
                >
                  Recents
                </p>
                {children}
              </motion.div>
            )}
          </div>
        </AnimatePresence>

        {/* Option: About Us */}
        <Option
          Icon={MdOutlinePeopleAlt}
          title="About Us"
          open={extended}
          href="/about-us"
          aria-label="Learn more about our team and history"
        />

        {/* Option: Contact Us */}
        <Option
          Icon={GrContactInfo}
          title="Contact Us"
          open={extended}
          href="/contact-us"
          aria-label="Contact our team"
        />

        {/* Option: Settings */}
        <Option
          Icon={MdOutlineSettings}
          title="Dashboard"
          label="Coming Soon"
          open={extended}
          aria-label="Dashboard Settings"
        />

        {/* Option: Theme Toggle */}
        <Option
          Icon={theme === "light" ? PiMoon : TbBrightnessDown}
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
          label="Theme"
          open={extended}
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        />
      </motion.nav>
      <AnimatePresence>
        {extended && (
          <motion.div
            onClick={toggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`sm:hidden z-[100] absolute inset-0 bg-black/50`}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
