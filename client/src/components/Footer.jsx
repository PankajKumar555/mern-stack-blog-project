import React from "react";
import { logo } from "../urls/CarouselImageUrls";

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle} className="footer-content">
        <div style={footerLogoStyle} className="footer-logo">
          <img src={logo} alt="Logo" style={logoImageStyle} />
          <h1 style={logoTextStyle}>BLOG</h1>
        </div>
      </div>
      <div style={footerBottomStyle} className="footer-bottom">
        <p style={copyrightStyle}>
          &copy; {new Date().getFullYear()} Company Name. All rights reserved by
          Pankaj.
        </p>
      </div>
    </footer>
  );
}

// Define CSS styles as JavaScript objects
const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "50px 0",
};

const footerContentStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
};

const footerLogoStyle = {
  display: "flex",
  alignItems: "center",
};

const logoImageStyle = {
  width: "100px",
  height: "auto",
  paddingBottom: "20px",
  marginLeft: "10px",
};

const logoTextStyle = {
  marginLeft: "10px",
};

const footerBottomStyle = {
  backgroundColor: "#111",
  textAlign: "center",
  padding: "10px 0",
};

const copyrightStyle = {
  margin: "0",
};

export default Footer;
