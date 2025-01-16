import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PricingPlan {
  tier: string;
  price: string;
  features: string[];
  isHighlighted?: boolean;
}

interface PricingCardProps extends PricingPlan {
  isHighlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  price,
  features,
  isHighlighted = false,
}) => {
  return (
    <div
      className={`flex flex-col p-6 border ${
        isHighlighted
          ? "border-primary-200 border-4 outline-primary-300 outline-4 outline-offset-8 outline"
          : "border-primary-100 border-4"
      } bg-white dark:bg-card-hover`}
    >
      <h2 className="text-center text-3xl font-semibold text-gray-700 dark:text-white mb-2">
        {tier}
      </h2>
      <div className="bg-gray-700 dark:bg-white h-1 w-full my-2"></div>
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
        className={`w-full py-2 px-4 rounded-md font-medium transition-opacity hover:opacity-80
          ${
            isHighlighted
              ? "bg-primary-200 text-white"
              : "bg-primary-100 text-dark"
          }`}
        type="button"
      >
        SELECT
      </button>
    </div>
  );
};

const PricingTable: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      tier: "FREE",
      price: "0",
      features: [
        "GPT-4 and image outputs",
        "5 weekly prompt credits",
        "5 new prompt credits every 7 days",
      ],
    },
    {
      tier: "BASIC",
      price: "12",
      features: [
        "GPT-4 and image outputs",
        "40 monthly prompt credits",
        "1mo saved search history",
      ],
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
      isHighlighted: true,
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
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full flex relative lg:overflow-hidden bg-card px-0"
      role="main"
    >
      <Link
        to={"/"}
        aria-label="Go back to the homepage"
        className="absolute top-8 left-4 sm:left-12 rounded-lg w-12 h-8 cursor-pointer grid place-content-center border-b border-neutral-700 dark:border-primary-100 text-dark dark:text-primary-100 text-2xl"
      >
        <IoArrowBackOutline />
      </Link>
      <main
        id="main-content"
        className="flex-1 min-h-screen h-full flex flex-col gap-2 sm:gap-7 p-[5rem_1rem] sm:p-[5rem_3rem] max-sm:pb-4 w-full"
        aria-labelledby="about-us-title"
      >
        <h1
          id="about-us-title"
          className="pt-10 text-xl sm:text-4xl leading-tight font-semibold"
        >
          SpeakImage.ai Pricing Plan
        </h1>
        <div className="max-w-7xl w-full mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.tier} {...plan} />
            ))}
          </div>
        </div>
      </main>
    </motion.section>
  );
};

export default PricingTable;
