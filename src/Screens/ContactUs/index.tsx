import React, { useState } from "react";
import "./index.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { message } from "antd";

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    textarea: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        "service_docdl2g",     // Your EmailJS Service ID
        "template_f973st8",    // Your EmailJS Template ID
        templateParams,
        "hY8VJ7KswAGlL-uem"    // Your EmailJS User ID
      );
      console.log("Email successfully sent!", response.status, response.text);
      message.success("Message sent successfully!");
      setFormData({ name: "", email: "", textarea: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      message.error("Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="about-back-icon-container" onClick={() => navigate("/")}>
        <IoArrowBackOutline className="about-back-icon" />
      </div>
      <span className="contact-us-heading">Get in Touch with SpeakImage</span>
      <span className="contact-us-subheading">
        Have questions or need support? Our team is here to help. Reach out and
        let's create something amazing together!
      </span>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="textarea">Message for Support</label>
            <textarea
              cols={50}
              rows={10}
              id="textarea"
              name="textarea"
              value={formData.textarea}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form-submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
