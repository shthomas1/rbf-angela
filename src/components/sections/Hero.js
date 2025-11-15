import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sections/Hero.css";
import "../../styles/GlobalStyles.css";

const Hero = () => {
  return (
    <section className="hero">
      {/* Summer-themed elements */}
      <div className="hero-pattern"></div>
      <div className="sun-element"></div>
      <div className="beach-ball"></div>
      <div className="beach-ball"></div>
      <div className="beach-ball"></div>

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Summer Open <span>Hackathon</span>
          </h1>
          <p className="hero-subtitle">
            A 36-hour virtual coding event where creativity meets technology.
            Join us for an unforgettable weekend of innovation!
          </p>

          {/* <div className="hero-cta-group">
            <Link to="/register" className="register-button register-button-large">
              Register Now
            </Link>
          </div> */}

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">100+</span>
              <span className="hero-stat-label">Participants</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">36</span>
              <span className="hero-stat-label">Hours</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">12</span>
              <span className="hero-stat-label">Judges</span>
            </div>
          </div>
        </div>
        <div className="code-elements">
          <span
            className="code-line"
            style={{ top: "15%", left: "5%", animationDuration: "15s" }}
          >
            {"function createInnovation() {"}
          </span>
          <span
            className="code-line"
            style={{ top: "25%", left: "15%", animationDuration: "18s" }}
          >
            {"const ideas = [];"}
          </span>
          <span
            className="code-line"
            style={{ top: "35%", left: "8%", animationDuration: "12s" }}
          >
            {"const creativity = new Creativity();"}
          </span>
          <span
            className="code-line"
            style={{ top: "45%", left: "20%", animationDuration: "20s" }}
          >
            {"return ideas.map(idea => creativity.apply(idea));"}
          </span>
          <span
            className="code-line"
            style={{ top: "55%", left: "12%", animationDuration: "16s" }}
          >
            {"}"}
          </span>
          <span
            className="code-line"
            style={{ top: "65%", left: "25%", animationDuration: "14s" }}
          >
            {"const hackathon = new SummerHackathon();"}
          </span>
          <span
            className="code-line"
            style={{ top: "75%", left: "10%", animationDuration: "17s" }}
          >
            {"hackathon.start();"}
          </span>
          <span
            className="code-line"
            style={{ top: "85%", left: "18%", animationDuration: "19s" }}
          >
            {"// Join us and code the future!"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;