import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaGithub,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Countdown from "../ui/Countdown";
import "../../styles/layout/Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Get user's time zone
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(timeZone);
    } catch (error) {
      console.warn("Could not detect user timezone, using UTC", error);
      setUserTimeZone("UTC");
    }
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem("registeredUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setUserData(parsedUser);
        } catch (e) {
          console.error("Error parsing stored user data", e);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    const intervalId = setInterval(checkLoginStatus, 5000);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      clearInterval(intervalId);
    };
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileElement = document.getElementById("user-profile-dropdown");
      if (
        profileElement &&
        !profileElement.contains(event.target) &&
        showProfileMenu
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleGitHubLogin = () => {
    setLoading(true);
    const clientId = "Ov23liirEqIDwwnIsirA";
    const callbackUrl = "https://summeropen2025.com/register";
    const state = "login";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=user:email&state=${state}`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileMenu(false);
    navigate("/");
  };

  const handleScheduleClick = () => {
    if (isHomePage) {
      // If already on homepage, scroll to schedule section
      const scheduleSection = document.getElementById("schedule");
      if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to homepage and then scroll to schedule
      // Store a flag in sessionStorage to indicate we need to scroll to schedule
      sessionStorage.setItem("scrollToSchedule", "true");
      navigate("/");
    }

    // Close mobile menu and profile dropdown if open
    if (isMenuOpen) toggleMenu();
    if (showProfileMenu) setShowProfileMenu(false);
  };

  // Add this effect to your component to handle the scroll after navigation
  useEffect(() => {
    // Check if we need to scroll to schedule after navigation
    if (isHomePage && sessionStorage.getItem("scrollToSchedule") === "true") {
      // Remove the flag
      sessionStorage.removeItem("scrollToSchedule");

      // Give time for the page to render, then scroll
      setTimeout(() => {
        const scheduleSection = document.getElementById("schedule");
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Delay to ensure the section is rendered
    }
  }, [isHomePage]);

  const handleUpdateProfile = () => {
    setShowProfileMenu(false);
    navigate("/update-profile");
  };

  const handleTeamsClick = () => {
    navigate("/teams");
    if (isMenuOpen) toggleMenu();
    if (showProfileMenu) setShowProfileMenu(false);
  };

  // Function to get the appropriate target date (start or end time)
  const getTargetDate = () => {
    const startTime = "2025-06-28T06:00:00-05:00"; // June 28, 6:00 AM CDT
    const endTime = "2025-06-29T18:00:00-05:00";   // June 29, 6:00 PM CDT
    
    const now = new Date();
    const startDate = new Date(startTime);
    
    // If current time is before start time, countdown to start
    // If current time is after start time, countdown to end
    return now < startDate ? startTime : endTime;
  };

  // Function to determine if we're counting down to start or end
  const getCountdownType = () => {
    const startTime = "2025-06-28T06:00:00-05:00";
    const now = new Date();
    const startDate = new Date(startTime);
    
    return now < startDate ? "start" : "end";
  };

  // Function to get a human-readable event time description
  const getEventTimeDescription = () => {
    if (!userTimeZone) return "";
    
    const targetDate = new Date(getTargetDate());
    const localTime = targetDate.toLocaleString("en-US", {
      timeZone: userTimeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    
    const countdownType = getCountdownType();
    return `${countdownType === 'start' ? 'Starts' : 'Ends'}: ${localTime}`;
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar">
          <div className="left-section">
            <Link to="/" className="logo">
              <div className="logo-icon">&lt;/&gt;</div>
              <span>Summer Open 2025</span>
            </Link>
          </div>

          <div className="center-section">
            {userTimeZone && (
              <Countdown 
                targetDate={getTargetDate()} 
                header={true}
                userTimeZone={userTimeZone}
                countdownType={getCountdownType()}
              />
            )}
          </div>

          <div className="right-section">
            <button
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
            <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
              {isLoggedIn ? (
                <div className="user-profile" id="user-profile-dropdown">
                  <div
                    className="user-info"
                    onClick={toggleProfileMenu}
                    style={{ cursor: "pointer" }}
                  >
                    {userData?.avatar_url ? (
                      <img
                        src={userData.avatar_url}
                        alt={`${userData.name}'s avatar`}
                        className="user-avatar"
                      />
                    ) : (
                      <FaGithub className="user-icon" />
                    )}
                    <span className="username">
                      {userData?.githubUsername || userData?.name || "User"}
                    </span>
                  </div>

                  {/* Profile dropdown menu with all user actions */}
                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <button onClick={handleScheduleClick} className="dropdown-item">
                        <FaCalendarAlt />
                        <span>Schedule</span>
                      </button>
                      <button onClick={handleTeamsClick} className="dropdown-item">
                        <FaUsers />
                        <span>Teams</span>
                      </button>
                      <button
                        onClick={handleUpdateProfile}
                        className="dropdown-item"
                      >
                        <FaUserEdit />
                        <span>Update Profile</span>
                      </button>
                      <button onClick={handleLogout} className="dropdown-item">
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Schedule Button - Show for non-logged in users */}
                  <button onClick={handleScheduleClick} className="nav-cta">
                    <FaCalendarAlt />
                    <span>Schedule</span>
                  </button>
                  <button
                    onClick={handleGitHubLogin}
                    className="login-link"
                    disabled={loading}
                  >
                    <FaGithub />
                    {loading ? "Connecting..." : "Login"}
                  </button>
                  <Link
                    to="/register"
                    className="nav-cta"
                    onClick={() => isMenuOpen && toggleMenu()}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;