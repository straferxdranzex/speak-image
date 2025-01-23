import React from "react";
import { MdOutlinePeopleAlt, MdOutlineSettings } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { TbBrightnessDown } from "react-icons/tb";
import { PiMoon } from "react-icons/pi";
import { Option, ToggleClose } from "./SidebarOptions";
import { motion, AnimatePresence } from "framer-motion";
import { FaDollarSign } from "react-icons/fa6";

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
  selectedPlan?: any;
}

export const Sidebar: React.FC<SidebarProps> = ({
  extended,
  toggle,
  initiateNewChat,
  children,
  selectedPlan,
}: any) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <motion.nav
        className={`max-sm:absolute left-0 z-[500] h-full shrink-0 bg-card-2 text-foreground flex flex-col justify-between p-1 sm:px-3.5 py-4 overflow-hidden`}
        initial={extended ? "open" : "closed"}
        animate={extended ? "open" : "closed"}
        variants={
          window.innerWidth < 640 ? sidebarVariantsMob : sidebarVariants
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-label="Sidebar Navigation"
      >
        {/* Toggle Button for Opening and Closing Sidebar */}
        <ToggleClose open={extended} setOpen={toggle} />
        <div className="h-2" />
        {/* Option: New Chat */}
        <Option
          highlight
          Icon={IoIosAdd}
          title="New Chat"
          open={extended}
          onClick={initiateNewChat}
          aria-label="Start a New Chat"
        />
        <div className="h-2" />
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

        <div className="flex flex-col px-2 pb-4 gap-2">
          <AnimatePresence>
            {extended && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap w-full flex"
              >
                <p className="text-light text-xs font-medium relative">
                  {(() => {
                    switch (selectedPlan?.plan?.toLowerCase()) {
                      case "basic":
                        return `Credits: ${
                          selectedPlan?.prompt_credits || 0
                        }/40`;
                      case "premium":
                        return `Credits: Unlimited`;
                      case "pro":
                        return `Credits: Unlimited`;
                      default:
                        return `Credits: ${
                          selectedPlan?.prompt_credits || 0
                        }/5`;
                    }
                  })()}
                  <span className="opacity-70 pl-1 capitalize">
                    ({selectedPlan?.plan?.toLowerCase()} Plan)
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {(selectedPlan?.plan === "free" ||
            selectedPlan?.plan === "basic") && (
            <div className="h-1 flex dark:bg-white/20 bg-black/20 rounded-sm">
              <div
                style={{
                  width: `${
                    selectedPlan?.plan?.toLowerCase() === "basic"
                      ? ((selectedPlan?.prompt_credits || 0) / 40) * 100
                      : ((selectedPlan?.prompt_credits || 0) / 5) * 100
                  }%`,
                }}
                className="dark:bg-white/80 bg-black rounded-sm"
              ></div>
            </div>
          )}
        </div>

        {/* Option: About Us */}
        <Option
          Icon={FaDollarSign}
          title="Pricing"
          open={extended}
          href="/pricing"
          aria-label="Learn more about our team and history"
        />

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
          label="Dashboard"
          href="/dashboard"
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
