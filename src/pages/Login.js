import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Added Link import
import "../styles/pages/Login.css";
import { FaGithub, FaSpinner } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Extract the code from URL parameters (from GitHub OAuth callback)
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get("code");

        if (code) {
            handleGitHubCallback(code);
        }
    }, [location]);

    const handleGitHubCallback = async (code) => {
        setLoading(true);
        setError("");

        try {
            // First, exchange the code for a token
            const tokenResponse = await fetch("/api/github-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const tokenData = await tokenResponse.json();

            if (!tokenData.access_token) {
                throw new Error("Failed to authenticate with GitHub");
            }

            // Get user data from GitHub
            const userResponse = await fetch("https://api.github.com/user", {
                headers: { Authorization: `token ${tokenData.access_token}` }
            });

            const userData = await userResponse.json();

            // Get user email if not provided
            let email = userData.email;
            if (!email) {
                const emailResponse = await fetch("https://api.github.com/user/emails", {
                    headers: { Authorization: `token ${tokenData.access_token}` }
                });

                const emails = await emailResponse.json();
                const primaryEmail = emails.find(e => e.primary) || emails[0];
                if (primaryEmail) {
                    email = primaryEmail.email;
                }
            }

            if (!email) {
                throw new Error("Could not retrieve email from GitHub");
            }

            // Check if the user exists in our database
            const apiUrl = 'https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations';
            const checkResponse = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);

            if (checkResponse.ok) {
                const registrations = await checkResponse.json();
                const existingUser = Array.isArray(registrations) && registrations.find(
                    reg => reg.email.toLowerCase() === email.toLowerCase()
                );

                if (existingUser) {
                    // User found - they're already registered
                    localStorage.setItem('registeredUser', JSON.stringify({
                        name: existingUser.name,
                        email: existingUser.email,
                        githubUsername: userData.login,
                        registrationDate: existingUser.registeredAt,
                        avatar_url: userData.avatar_url
                    }));

                    // Redirect to thank you/dashboard page
                    navigate('/thank-you');
                } else {
                    // User not found - redirect to registration page with pre-filled data
                    // Store GitHub data in sessionStorage for the registration page
                    sessionStorage.setItem('githubUser', JSON.stringify({
                        name: userData.name || userData.login,
                        email: email,
                        githubUsername: userData.login
                    }));

                    // Redirect to complete registration
                    navigate('/register'); // Changed from '/login' to '/register'
                }
            } else {
                throw new Error("Failed to check registration status");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-content">
                    <h1 className="login-title">Login to Summer Open</h1>

                    {loading ? (
                        <div className="loading-container">
                            <FaSpinner className="spinner" />
                            <p>Authenticating with GitHub...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p className="error-message">{error}</p>
                            <button
                                className="retry-button"
                                onClick={() => {
                                    // Reset error and try again
                                    setError("");

                                    const clientId = "Ov23liirEqIDwwnIsirA";
                                    const callbackUrl = "https://summeropen2025.com/register"; // Keep as /register
                                    const state = "login"; // This state parameter indicates this is a login attempt

                                    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
                                        callbackUrl
                                    )}&scope=user:email&state=${state}`;

                                    window.location.href = authUrl;
                                }}
                            >
                                Try Again
                            </button>
                            <button
                                className="github-button"
                                onClick={() => {
                                    const clientId = "Ov23liirEqIDwwnIsirA";
                                    const callbackUrl = "https://summeropen2025.com/register"; // Keep as /register
                                    const state = "login"; // This state parameter indicates this is a login attempt

                                    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
                                        callbackUrl
                                    )}&scope=user:email&state=${state}`;

                                    window.location.href = authUrl;
                                }}
                            >
                                <FaGithub className="github-icon" />
                                Sign in with GitHub
                            </button>
                            <Link to="/" className="back-link">
                                Back to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="github-auth-container">
                            <p>Please sign in with GitHub to access your account.</p>
                            <button
                                className="github-button"
                                onClick={() => {
                                    const clientId = "Ov23liirEqIDwwnIsirA";
                                    // Fix the redirect URL - add missing slash if needed
                                    const callbackUrl = "https://summeropen2025.com/login"; // Changed to /login since this is the Login component
                                    const state = "login";

                                    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
                                        callbackUrl
                                    )}&scope=user:email&state=${state}`;

                                    window.location.href = authUrl;
                                }}
                            >
                                <FaGithub className="github-icon" />
                                Sign in with GitHub
                            </button>
                            <p className="github-note">
                                We use GitHub authentication to verify your identity.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;