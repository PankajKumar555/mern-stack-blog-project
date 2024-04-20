import React from "react";
import "./Footer.css";
import Logo from "../images/Logo.jpg";

const Footer = () => {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          <img src={Logo} style={{ height: "50px" }} alt="Logo" />
          <p className="footer-links">
            <a className="link-1">Home</a>

            <a>Blog</a>

            <a>Pricing</a>

            <a>About</a>

            <a>Faq</a>

            <a>Contact</a>
          </p>

          <p className="footer-company-name">Created By Pankaj © 2024</p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa-solid fa-location-dot"></i>
            <p>
              <span>444 S. East West</span> Delhi, India
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+91.555.888.7777</p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:pankajsing555@gmail.com">
                pankajsing555@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div className="footer-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://www.github.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
