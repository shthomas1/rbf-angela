import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaDiscord, FaGithub, FaUserEdit } from "react-icons/fa";
import "../styles/pages/ThankYou.css";

const ThankYou = () => {
  const [userData, setUserData] = useState({
    name: "",
    githubUsername: "",
    email: ""
  });
  
  useEffect(() => {
    // Retrieve user data from localStorage
    try {
      const storedUser = localStorage.getItem("registeredUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }, []);

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          
          <h1 className="thank-you-title">Registration Complete!</h1>
          
          <p className="thank-you-message">
            {userData.githubUsername ? (
              <>Thank you <strong>{userData.githubUsername}</strong> for registering for the Summer Open Hackathon.</>
            ) : (
              <>Thank you for registering for the Summer Open Hackathon.</>
            )} 
            We're excited to have you join us for this coding adventure!
          </p>
          
          {/* New User Profile Section */}
          <div className="user-profile-section">
            <h2>Your Profile</h2>
            <div className="profile-details">
              {userData.avatar_url && (
                <img 
                  src={userData.avatar_url} 
                  alt={`${userData.name || userData.githubUsername}'s avatar`} 
                  className="profile-avatar"
                />
              )}
              <div className="profile-info">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>GitHub:</strong> {userData.githubUsername}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                {userData.categories && (
                  <p><strong>Categories:</strong> {userData.categories}</p>
                )}
                {userData.experience && (
                  <p><strong>Experience:</strong> {userData.experience}</p>
                )}
              </div>
              <Link to="/update-profile" className="update-profile-button">
                <FaUserEdit className="button-icon" />
                Update Profile
              </Link>
            </div>
          </div>
          
          <div className="confirmation-details">
            <h2>What's Next?</h2>
            
            <div className="next-steps">
              <div className="next-step-item">
                <div className="step-icon">
                  <FaCalendarAlt />
                </div>
                <div className="step-content">
                  <h3>Mark Your Calendar</h3>
                  <p>The hackathon starts on <strong>June 28, 2025 at 6:00 AM</strong> and ends on <strong>June 29, 2025 at 6:00 PM</strong>.</p>
                </div>
              </div>
              
              <div className="next-step-item">
                <div className="step-icon">
                  <FaDiscord />
                </div>
                <div className="step-content">
                  <h3>Join Our Discord</h3>
                  <p>Connect with other participants, mentors, and organizers in our Discord community. We will release prompts via Discord.</p>
                  <a 
                    href="https://discord.gg/CZexBXcAfs"
                    className="discord-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord Server
                  </a>
                </div>
              </div>
              
              <div className="next-step-item">
                <div className="step-icon">
                  <FaGithub />
                </div>
                <div className="step-content">
                  <h3>Keep an eye on your Email</h3>
                  <p>At some point before the competition, we will put out more information for competitors. We will release prompts via Email.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="thank-you-actions">
            <Link to="/" className="home-button">Return to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;