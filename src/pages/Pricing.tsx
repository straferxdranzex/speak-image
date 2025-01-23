import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import gradient from "../Assets/Images/gradient-login.svg";
import loader from "../Assets/loader.gif";
import Button from "../components/ui/Button";

interface PricingPlan {
  tier: string;
  price: string;
  features: string[];
  selectedPlan?: string;
  planId: string; // Maps directly to Stripe's price IDs
}

const PricingCard: React.FC<PricingPlan> = ({
  tier,
  price,
  features,
  selectedPlan,
  planId,
}) => {
  const isHighlighted = selectedPlan === tier.toLowerCase();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    const token = Cookies.get("userToken");

    if (!token) {
      alert("You must log in to subscribe to a plan.");
      return;
    }

    axios
      .post(
        "https://api.speakimage.ai/stripe/create-checkout-session",
        { plan_id: planId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        // Redirect to the Stripe Checkout page
        window.location.href = response.data.url;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
        alert("Failed to initiate checkout. Please try again.");
        setIsLoading(false);
      });
  };
  return (
    <div
      className={`flex flex-col p-6 border ${
        isHighlighted
          ? "border-primary-200 border-2"
          : "border-primary-100 border-2 my-4"
      } bg-white dark:bg-card-hover rounded-xl`}
    >
      <h2 className="text-center text-3xl font-semibold text-gray-700 dark:text-white mb-2">
        {tier}
      </h2>
      <div className="bg-gray-700 dark:bg-white h-0.5 opacity-30 w-full mt-2 mb-4"></div>
      <div className="text-center text-4xl font-bold text-gray-700 dark:text-white mb-6">
        ${price} <span>/MO</span>
      </div>
      <ul className="flex-grow space-y-1 mb-6">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start text-gray-600 dark:text-white/70"
          >
            <svg
              className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        disabled={isHighlighted || isLoading}
        onClick={handleButtonClick}
        className={`w-full h-10 py-2 px-4 flex justify-center items-center rounded-md font-medium transition-opacity disabled:opacity-100 hover:opacity-80
          ${
            isHighlighted
              ? "bg-primary-200 text-white"
              : "bg-primary-100 text-dark"
          }`}
        type="button"
      >
        {isLoading ? (
          <img
            src={loader}
            alt="loader"
            className="size-6 mix-blend-multiply"
          />
        ) : isHighlighted ? (
          "SELECTED"
        ) : (
          "SELECT"
        )}
      </button>
    </div>
  );
};

const PricingTable: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState("free"); // Default plan is "free"

  const plans: PricingPlan[] = [
    {
      tier: "FREE",
      price: "0",
      features: [
        "GPT-4 and image outputs",
        "5 weekly prompt credits",
        "5 new prompt credits every 7 days",
      ],
      planId: "free",
    },
    {
      tier: "BASIC",
      price: "12",
      features: [
        "GPT-4 and image outputs",
        "40 monthly prompt credits",
        "1mo saved search history",
      ],
      planId: "basic",
    },
    {
      tier: "PREMIUM",
      price: "22",
      features: [
        "Unlimited generations",
        "GPT-4 and image outputs",
        "Verbal prompting (coming soon)",
        "3mo saved search history",
      ],
      planId: "premium",
    },
    {
      tier: "PRO",
      price: "44",
      features: [
        "Unlimited generations",
        "GPT-4 and image outputs",
        "Verbal prompting (coming soon)",
        "Unlimited saved search history",
      ],
      planId: "pro",
    },
  ];

  useEffect(() => {
    const handleSelectedPlan = () => {
      const token = Cookies.get("userToken");
      const id = Cookies.get("userId");

      if (!token || !id) {
        alert("You must log in to subscribe to a plan.");
        return;
      }

      axios
        .get(`https://api.speakimage.ai/api/user-credits/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        })
        .then((response) => {
          setSelectedPlan(response.data.plan || "free");
        })
        .catch((error) => {
          console.error("Error fetching user plan:", error);
        });
    };

    handleSelectedPlan();
  }, []);

  const handleReachUsClick = () => {
    window.open("mailto:sales@speakimage.ai", "_blank");
  };

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
        className="flex-1 min-h-screen h-full flex flex-col gap-2 sm:gap-7 p-[5rem_1rem] sm:p-[5rem_3rem] max-sm:pb-4 w-full relative z-10"
        aria-labelledby="about-us-title"
      >
        <h1
          id="about-us-title"
          className="pt-10 text-xl sm:text-5xl leading-tight font-semibold text-center"
        >
          SpeakImage.ai Pricing Plan
        </h1>
        <div className="max-w-7xl w-full mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <PricingCard
                key={plan.tier}
                {...plan}
                selectedPlan={selectedPlan}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-8 flex-col justify-center items-center">
          <p className="font-medium text-base sm:text-lg lg:text-xl !leading-relaxed tracking-tight text-center">
            For Enterprise plans, please reach out to us
          </p>

          <Button size="small" onClick={handleReachUsClick}>
            Reach Us
          </Button>
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

export default PricingTable;
