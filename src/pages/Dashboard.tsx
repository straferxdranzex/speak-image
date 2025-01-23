import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gradient from "../Assets/Images/gradient-login.svg";
import Button from "../components/ui/Button";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  name: string;
  email: string;
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
  };
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "subscription">(
    "profile"
  );
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    subscription: {
      plan: "free",
      status: "Active",
      nextBilling: "",
    },
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("userToken");
      const id = Cookies.get("userId");

      if (!token || !id) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.speakimage.ai/api/get-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser({
          name: response.data.full_name,
          email: response.data.email,
          subscription: {
            plan: response.data.subscription?.plan || "free",
            status: response.data.subscription?.status || "Inactive",
            nextBilling: response.data.subscription?.nextBilling || "N/A",
          },
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear any previous errors
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("userToken");
    const id = Cookies.get("userId");

    if (!token || !id) {
      setError("You must be logged in to update profile");
      return;
    }

    try {
      const response = await axios.put(
        `https://api.speakimage.ai/api/update-user/${id}`,
        {
          full_name: formData.name,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
      });
      setIsEditingProfile(false);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    const token = Cookies.get("userToken");
    const id = Cookies.get("userId");

    if (!token || !id) {
      setError("You must be logged in to change password");
      return;
    }

    try {
      await axios.put(
        `https://api.speakimage.ai/api/update-user/${id}`,
        {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsChangingPassword(false);
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password updated successfully");
    } catch (err: any) {
      console.error("Error changing password:", err);
      setError(
        err.response?.data?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );

    if (confirmed) {
      const token = Cookies.get("userToken");

      if (!token) {
        setError("You must be logged in to cancel your subscription");
        return;
      }

      try {
        const response = await axios.post(
          "https://api.speakimage.ai/stripe/cancel-subscription",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update local state to reflect cancelled subscription
        setUser({
          ...user,
          subscription: {
            ...user.subscription,
            status: "Cancelled",
          },
        });

        alert(response.data.message || "Subscription canceled successfully");
      } catch (err: any) {
        console.error("Error canceling subscription:", err);
        setError(
          err.response?.data?.message ||
            "Failed to cancel subscription. Please try again."
        );
      }
    }
  };

  console.log(error);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full flex relative overflow-hidden bg-card px-0"
      role="main"
    >
      <Link
        to={"/"}
        aria-label="Go back to the homepage"
        className="absolute z-[50] top-8 left-4 sm:left-12 rounded-lg w-12 h-8 cursor-pointer grid place-content-center border-b border-neutral-700 dark:border-primary-100 text-dark dark:text-primary-100 text-2xl"
      >
        <IoArrowBackOutline />
      </Link>

      <main
        id="main-content"
        className="flex-1 min-h-screen h-full flex flex-col gap-2 sm:gap-7 p-[5.5rem_0rem] sm:p-[5rem_3rem] w-full relative z-10"
        aria-labelledby="about-us-title"
      >
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex max-sm:flex-col bg-card-2 text-foreground rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="border-b sm:border-r border-card-hover">
              <div className="flex sm:flex-col max-sm:flex-wrap *:flex-shrink-0">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`transition-colors px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium ${
                    activeTab === "profile"
                      ? "bg-card-hover text-black dark:text-white"
                      : "text-text-light hover:text-black dark:hover:text-white"
                  }`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab("subscription")}
                  className={`transition-colors px-3 sm:px-6 py-3 sm:py-4 text-sm font-medium ${
                    activeTab === "subscription"
                      ? "bg-card-hover text-black dark:text-white"
                      : "text-text-light hover:text-black dark:hover:text-white"
                  }`}
                >
                  Subscription
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 flex-grow">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed font-semibold">
                        Profile Information
                      </h2>
                      {!isEditingProfile && (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="text-sm text-primary-200 hover:text-primary-100 transition-colors"
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <form
                        onSubmit={handleProfileSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-text-light">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-card-hover rounded-md shadow-sm outline-none focus:border-black/50 dark:focus:border-white/50 bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-light">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-card-hover rounded-md shadow-sm outline-none focus:border-black/50 dark:focus:border-white/50 bg-transparent"
                          />
                        </div>
                        <div className="flex space-x-3 pt-5">
                          <Button type="submit" size="small">
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setIsEditingProfile(false)}
                            size="small"
                            variant="ghost"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="size-16 sm:size-32 bg-card rounded-full flex justify-center items-center text-lg sm:text-3xl">
                            {user.name
                              ? user.name
                                  .split(" ") // Split the name into words
                                  .map((word) => word[0]) // Get the first letter of each word
                                  .join("") // Join the initials
                                  .toUpperCase() // Convert to uppercase
                              : "N/A"}{" "}
                            {/* Fallback if the name is unavailable */}{" "}
                          </div>
                        </div>
                        <div className="flex-grow space-y-3">
                          <div>
                            <span className="text-sm text-text-light">
                              Name
                            </span>
                            <p className="mt-2 text-sm">{user.name}</p>
                          </div>
                          <div>
                            <span className="text-sm text-text-light">
                              Email
                            </span>
                            <p className="mt-2 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Password Section */}
                  <div className="border-t border-card-hover pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base sm:text-xl leading-relaxed font-semibold">
                        Password
                      </h3>
                      {!isChangingPassword && (
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="text-sm text-primary-200 hover:text-primary-100 transition-colors"
                        >
                          Change Password
                        </button>
                      )}
                    </div>

                    {isChangingPassword && (
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-text-light">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-card-hover rounded-md shadow-sm outline-none focus:border-black/50 dark:focus:border-white/50 bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-light">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-card-hover rounded-md shadow-sm outline-none focus:border-black/50 dark:focus:border-white/50 bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-light">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="mt-2 block w-full px-3 py-2 border border-card-hover rounded-md shadow-sm outline-none focus:border-black/50 dark:focus:border-white/50 bg-transparent"
                          />
                        </div>
                        <div className="flex space-x-3 pt-5">
                          <Button type="submit" size="small">
                            Save Password
                          </Button>
                          <Button
                            onClick={() => setIsChangingPassword(false)}
                            size="small"
                            variant="ghost"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "subscription" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed font-semibold mb-4">
                      Subscription Details
                    </h2>
                    <div className="rounded-lg space-y-3">
                      <div>
                        <span className="text-sm text-text-light">
                          Current Plan
                        </span>
                        <p className="mt-1 text-sm font-medium">
                          {user.subscription.plan}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-text-light">Status</span>
                        <p className="mt-1 text-sm font-medium">
                          {user.subscription.status}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-text-light">
                          Next Billing Date
                        </span>
                        <p className="mt-1 text-sm font-medium">
                          {user.subscription.nextBilling}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 border-card-hover">
                    <h3 className="text-base sm:text-xl leading-relaxed font-semibold mb-4">
                      Subscription Management
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3 justify-start">
                        <Button
                          onClick={handleCancelSubscription}
                          size="small"
                          className="bg-red-600 hover:bg-red-500"
                        >
                          Cancel Subscription
                        </Button>
                        <Link to={"/pricing"}>
                          <Button size="small" variant="ghost">
                            Update Subscription
                          </Button>
                        </Link>
                      </div>
                      <p className="text-xs sm:text-sm text-text-light">
                        Your subscription will remain active until the end of
                        your current billing period.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <img
        src={gradient}
        alt="Gradient background decoration"
        width="100%"
        height="100%"
        className="absolute right-[50%] translate-x-1/2 translate-y-[60%] bottom-0 z-50 opacity-80 pointer-events-none"
        aria-hidden="true"
      />
    </motion.section>
  );
};

export default UserDashboard;
