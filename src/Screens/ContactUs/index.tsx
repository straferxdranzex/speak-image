import React from "react";
import "./index.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {

  const navigate = useNavigate();

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
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Company Email</label>
            <input name="email" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea cols={50} rows={10} id="textarea" name="textarea">
              {" "}
            </textarea>
          </div>
          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
