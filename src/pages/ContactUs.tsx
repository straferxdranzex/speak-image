import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    textarea: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      user_email: formData.email,
      message: formData.textarea,
    };

    try {
      const response = await emailjs.send(
        "service_docdl2g", // Your EmailJS Service ID
        "template_f973st8", // Your EmailJS Template ID
        templateParams,
        "hY8VJ7KswAGlL-uem" // Your EmailJS User ID
      );
      console.log("Email successfully sent!", response.status, response.text);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", textarea: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Contact Us | Speakimage";
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full min-h-screen flex justify-center items-center relative lg:overflow-hidden bg-card px-0"
      role="main"
    >
      <Link
        to={"/"}
        aria-label="Go back to the homepage"
        className="absolute top-8 left-4 sm:left-12 rounded-lg w-12 h-8 cursor-pointer grid place-content-center border-b border-neutral-700 dark:border-primary-100 text-neutral-700 dark:text-primary-100 text-2xl"
      >
        <IoArrowBackOutline />
      </Link>
      <main
        id="main-content"
        className="h-full flex flex-col gap-2 sm:gap-7 justify-center items-center p-[5rem_1rem] sm:p-[5rem_3rem] max-sm:pb-4"
        aria-labelledby="about-us-title"
      >
        <h1
          id="about-us-title"
          className="text-center text-xl sm:text-4xl leading-tight font-semibold"
        >
          Get in Touch with SpeakImage
        </h1>
        <p className="text-center text-neutral-700 dark:text-primary-100 text-base sm:text-lg leading-relaxed max-w-[79ch]">
          Have questions or need support? Our team is here to help. Reach out
          and let's create something amazing together!
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl h-fit w-fit flex p-[1px] relative">
          <form
            className="w-full max-w-96 bg-card-2 rounded-[calc(1rem-1px)] relative z-10 text-center py-8 px-6 text-sm flex flex-col gap-5 text-foreground"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="name" className="block text-xs">
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                aria-label={"Name"}
                aria-required={true}
                required
                className="py-3 px-4 w-full rounded-lg border border-neutral-800 dark:border-border placeholder:opacity-50 bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="email" className="block text-xs">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                aria-label={"Email"}
                aria-required={true}
                required
                className="py-3 px-4 w-full rounded-lg border border-neutral-800 dark:border-border placeholder:opacity-50 bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <label htmlFor="textarea" className="block text-xs">
                Message for Support
              </label>
              <textarea
                cols={50}
                rows={10}
                id="textarea"
                name="textarea"
                value={formData.textarea}
                onChange={handleChange}
                required
                className="py-3 px-4 w-full h-24 rounded-lg border border-neutral-800 dark:border-border placeholder:opacity-50 bg-transparent outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="sm:mt-4 relative py-4 px-4 text-xs flex items-center justify-center gap-2 font-normal rounded-xl cursor-pointer leading-none transition-all duration-300 bg-transparent hover:bg-foreground hover:text-background border border-neutral-800 dark:border-primary-100 text-foreground"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
          <div
            className={`[--conic-color:var(--primary-200)] dark:[--conic-color:#fff] ConicGradient ConicRotate absolute inset-0 w-[200%] h-[200%] left-1/2 top-1/2 -transform-x-1/2 -transform-y-1/2`}
          ></div>
        </div>
      </main>
    </motion.section>
  );
};

export default ContactUs;
