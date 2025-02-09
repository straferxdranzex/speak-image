import { motion } from "framer-motion";
import Button from "./Button";
import { Link } from "react-router-dom";

const Popup = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 inset-0 dark:bg-black/20 bg-black/60 z-[100000] flex justify-center items-center"
    >
      <div className="bg-white dark:bg-black p-5 rounded-2xl w-[min(100%,30rem)] text-center">
        <h2 className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed font-semibold">
          Credits Finished
        </h2>
        <p className="text-text-light mb-8 text-base max-w-[40ch] mx-auto">
          Please buy subscriptions or wait. Free 5 credits will be restored
          weekly!{" "}
        </p>

        <div className="flex space-x-3 pt-5 mx-auto w-fit">
          <Link to={"/get-started"}>
            <Button size="small" variant="ghost">
              Go Home
            </Button>
          </Link>
          <Link to={"/pricing"}>
            <Button type="submit" size="small">
              Go to Subscriptions
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;
