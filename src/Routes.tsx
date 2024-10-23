import React, { Suspense, useEffect, lazy } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { getCookie, isSessionExpired } from "./lib/utils";

const Login = lazy(() => import("./pages/Login"));
const Cover = lazy(() => import("./pages/Cover"));
const SignUp = lazy(() => import("./pages/SignUp"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const BetaPage = lazy(() => import("./pages/BetaPage"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Home = lazy(() => import("./pages/Home"));

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/Tooltip";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import { useTheme } from "./lib/ThemeProvider";
import { ThemeToggle } from "./components/ui/ThemeToggle";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const isGetStartedRoute =
    location.pathname === "/get-started" ||
    location.pathname === "/beta-version" ||
    location.pathname === "/";

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="text-sm !bg-card-2 !text-text-light"
        transition={Slide}
        theme={theme}
      />
      {!isGetStartedRoute && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100000]">
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeToggle />
            </TooltipTrigger>
            <TooltipContent>Toggle to switch theme mode.</TooltipContent>
          </Tooltip>
        </div>
      )}

      <Suspense fallback={<div></div>}>
        <a
          aria-label="Skip to main content"
          href="#main-content"
          className="sr-only text-text-light bg-background"
        >
          Skip to main content
        </a>
        <Routes>
          <Route path="/get-started" element={<Cover />} />
          <Route
            path="/demo"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/*
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
          /> */}
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/beta-version" element={<BetaPage />} />
        </Routes>
      </Suspense>
    </>
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