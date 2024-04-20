import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCode, faPalette } from "@fortawesome/free-solid-svg-icons";

function AboutUs() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>About Us</h1>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>
          Welcome to our blog! We are a team of passionate individuals who love
          sharing our knowledge and experiences with the world.
        </p>
        <p>
          Our mission is to provide valuable content on a wide range of topics
          including technology, design, and creativity.
        </p>
        <p>
          Whether you're a beginner or an expert, our goal is to inspire,
          educate, and entertain you through our blog posts.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ flex: "0 1 calc(33.33% - 20px)", textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faCode}
            style={{ fontSize: "2rem", marginBottom: "10px" }}
          />
          <h3>Expertise</h3>
          <p>
            Our team consists of skilled professionals with expertise in various
            fields including programming, web development, and software
            engineering.
          </p>
        </div>
        <div style={{ flex: "0 1 calc(33.33% - 20px)", textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faPalette}
            style={{ fontSize: "2rem", marginBottom: "10px" }}
          />
          <h3>Creativity</h3>
          <p>
            We believe in the power of creativity to solve problems and inspire
            others. Our blog reflects our passion for innovation and
            experimentation.
          </p>
        </div>
        <div style={{ flex: "0 1 calc(33.33% - 20px)", textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faUsers}
            style={{ fontSize: "2rem", marginBottom: "10px" }}
          />
          <h3>Community</h3>
          <p>
            Join our community of like-minded individuals who share your
            interests and enthusiasm. Together, we can learn, grow, and
            collaborate to make a difference.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src="https://images.unsplash.com/photo-1598121210875-08d6cf351459?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Team"
          style={{
            width: "30%",
            height: "15rem",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1461344577544-4e5dc9487184?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Office"
          style={{
            width: "30%",
            height: "15rem",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1533158219239-eefe76d5a232?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Meeting"
          style={{
            width: "30%",
            height: "15rem",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default AboutUs;
