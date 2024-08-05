import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import "./index.css";
import { TbBrightnessDown } from "react-icons/tb";
import { FaRegMoon } from "react-icons/fa";
import { Tooltip } from "antd";
import { getCookie, isSessionExpired } from "../utils";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import SignUp from "../Screens/Signup";
import Cover from "../Screens/Cover";
import ContactUs from "../Screens/ContactUs";
import AboutUs from "../Screens/AboutUs";
import BetaPage from "../Screens/BetaPage";

const AppRoutes: React.FC = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", preference);
  const location = useLocation();
  const isGetStartedRoute = location.pathname === "/get-started" || location.pathname === "/beta-version";

  return (
    <React.StrictMode>
      <div data-theme={isDark ? "dark" : "light"} className="app">
        {!isGetStartedRoute && (
          <Tooltip title="Toggle to switch theme mode." placement="bottom">
            {isDark ? (
              <div className="toggle-container-dark toggel-style">
                <FaRegMoon
                  className="dark-mode-icon"
                  onClick={() => setIsDark(!isDark)}
                />
              </div>
            ) : (
              <div className="toggle-container-light toggel-style">
                <TbBrightnessDown
                  className="dark-mode-icon"
                  onClick={() => setIsDark(!isDark)}
                />
              </div>
            )}
          </Tooltip>
        )}

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Cover />} />
            {/* <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-us"
              element={
                <ProtectedRoute>
                  <ContactUs />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/beta-version" element={<BetaPage />} />
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
      console.log(sessionToken, "session token routes");
      if (!sessionToken || isSessionExpired(sessionToken)) {
        navigate("/get-started");
      }
    };

    checkSession();
  }, [navigate]);

  return <>{children}</>;
};

export default AppRoutes;
