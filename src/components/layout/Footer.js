import React from 'react';
import '../../styles/layout/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Summer Open Hackathon</h3>
            <p>A 36-hour virtual coding event bringing together creative minds to build innovative solutions.</p>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#mentors">Mentors</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><a href="https://discord.gg/PeyxWgKC5k">Discord: Join for Updates!</a></li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          &copy; 2025 Signal Surge. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;