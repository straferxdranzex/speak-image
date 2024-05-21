// src/AppRoutes.tsx
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../Screens/Home/Index";
import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import { TriangleLoader } from "../Screens/Components/TriangularLoader";
import useLocalStorage from "use-local-storage";
import "./index.css";
import { TbBrightnessDown } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa";
import { Tooltip } from "antd";
import { getCookie, isSessionExpired } from "../utils"; // Import the utility functions

const AppRoutes: React.FC = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", preference);

  return (
    <React.StrictMode>
      <div data-theme={isDark ? "dark" : "light"} className="app">
        <Tooltip title="Toggle to switch theme mode." placement="bottom">
          {isDark ? (
            <div className="toggle-container-dark toggel-style">
              <FaRegMoon className="dark-mode-icon" onClick={() => setIsDark(!isDark)} />
            </div>
          ) : (
            <div className="toggle-container-light toggel-style">
              <TbBrightnessDown className="dark-mode-icon" onClick={() => setIsDark(!isDark)} />
            </div>
          )}
        </Tooltip>
        <Suspense fallback={<TriangleLoader />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Suspense>
      </div>
    </React.StrictMode>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const sessionToken = getCookie("userToken");
      console.log(sessionToken, "session token routes")
      if (!sessionToken || isSessionExpired(sessionToken)) {
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  return <>{children}</>;
};

export default AppRoutes;
