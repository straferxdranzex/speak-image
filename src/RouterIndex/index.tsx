import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Screens/Home/Index";
import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import { TriangleLoader } from "../Screens/Components/TriangularLoader";
import useLocalStorage from "use-local-storage";
import "./index.css";
import { TbBrightnessDown } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa";
import { Toggle } from "../Screens/Components/Toggle";
import { Tooltip } from "antd";

const AppRoutes: React.FC = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", preference);
  return (
    <div data-theme={isDark ? "dark" : "light"} className="app">
      <Tooltip title="Toggle to switch theme mode." placement="bottom">
      {isDark ? (
        <div className="toggle-container">
          <FaRegMoon className="dark-mode-icon" onClick={() => setIsDark(!isDark)} />
        </div>
      ) : (
        <div className="toggle-container">
          <TbBrightnessDown className="dark-mode-icon" onClick={() => setIsDark(!isDark)} />
        </div>
      )}
      </Tooltip>
      {/* <Toggle handleChange={() => setIsDark(!isDark)} isChecked={isDark} /> */}

      <Suspense
        fallback={
          <div className="suspense-blur-screen">
            <TriangleLoader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
