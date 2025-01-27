import { Link, useSearchParams } from "react-router-dom";
import gradient from "../Assets/Images/gradient-login.svg";
import { IoArrowBackOutline } from "react-icons/io5";
import Button from "../components/ui/Button";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Optional: Log the session ID to debug
  console.log(sessionId);

  return (
    <section
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
        className="flex-1 min-h-screen h-full flex flex-col items-center gap-2 sm:gap-7 p-[5.5rem_0rem] sm:p-[5rem_3rem] w-full relative z-10"
        aria-labelledby="about-us-title"
      >
        <div className="flex gap-6 mt-8 flex-col justify-center items-center">
          <p className="text-[1.375rem] sm:text-[2.5rem] leading-relaxed font-medium text-center max-w-[22ch] sm:max-w-[40ch]">
            Payment Successful. Thank You!
          </p>
          <Link to={"/"}>
            <Button>Go Back to Speakimage.ai</Button>
          </Link>
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
    </section>
  );
};

export default SuccessPage;
