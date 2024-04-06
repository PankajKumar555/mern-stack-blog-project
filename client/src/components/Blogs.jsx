import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

function Blogs({ handleBackClick, values }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <img
          src={values.imageUrl}
          alt="Opps..., You did'nt uploaded valid Url..."
          style={imageStyle}
        />
        <Button
          variant="secondary"
          onClick={handleBackClick}
          style={{ display: "block", margin: "1rem" }}
        >
          ←Back
        </Button>
        <h2 style={textStyle}>{values.blogTitle}</h2>
        <p style={textStyle}>{values.blogBody}</p>
      </div>
    </div>
  );
}

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //   height: "100vh",
};

const contentStyle = {
  textAlign: "center",
};

const imageStyle = {
  width: "100%",
  height: "50vh",
  overflow: "hidden",
  backgroundSize: "cover",
  backgroundPosition: "50% 50%",
  backGroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  maxWidth: "700px",
  margin: "20px auto",
  fontSize: "18px",
  lineHeight: "1.6",
};

export default Blogs;
