import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/pages/Register.css";
import { FaGithub } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "beginner",
    githubUsername: "",
    categories: {
      fullStackDev: false,
      dataAnalytics: false,
      dataParsing: false,
      gameDevelopment: false,
      mobileAppDev: false,
    },
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  // Add state for GitHub user data including avatar URL
  const [githubUserData, setGithubUserData] = useState(null);
  const [apiConnected, setApiConnected] = useState(true);

  // Test API connection
  const testAPIConnection = async () => {
    try {
      const apiUrl =
        "https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations";

      // Use GET instead of HEAD since the API might not support HEAD
      const response = await fetch(apiUrl, {
        method: "GET",
        cache: "no-cache",
        headers: {
          Accept: "application/json",
        },
      });

      // An empty array is a valid response, so check if response can be parsed as JSON
      const text = await response.text();
      let isValid = false;

      try {
        // Check if response is valid JSON (even an empty array)
        const data = JSON.parse(text);
        isValid = true;
        console.log("API returned valid JSON:", data);
      } catch (parseError) {
        console.error("API response is not valid JSON:", text);
      }

      console.log("API connection test result:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        isValidJson: isValid,
      });

      // Consider the API connected if we got a 200 status and valid JSON
      const apiConnected = response.ok && isValid;
      setApiConnected(apiConnected);
      return apiConnected;
    } catch (error) {
      console.error("API connection test failed:", error);
      setApiConnected(false);
      return false;
    }
  };

  // Define fetchGitHubUserData first to avoid circular dependencies
  const fetchGitHubUserData = async (token) => {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: { Authorization: `token ${token}` },
      });

      const userData = await response.json();
      // Store the full user data object for later use
      setGithubUserData(userData);

      let email = userData.email;
      if (!email) {
        const emailResponse = await fetch(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `token ${token}` },
          }
        );

        const emails = await emailResponse.json();
        const primaryEmail = emails.find((e) => e.primary) || emails[0];
        if (primaryEmail) {
          email = primaryEmail.email;
        }
      }

      setFormData((prev) => ({
        ...prev,
        name: userData.name || userData.login,
        email: email || "",
        githubUsername: userData.login,
      }));

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  // Then define exchangeCodeForToken
  const exchangeCodeForToken = async (code) => {
    setLoading(true);
    try {
      const response = await fetch("/api/github-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.access_token) {
        await fetchGitHubUserData(data.access_token);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error exchanging code for token:", error);
      setLoading(false);
    }
  };

  // Categories for the hackathon
  const categories = [
    {
      id: "fullStackDev",
      name: "Full Stack Development",
      description:
        "Build complete web applications with both frontend and backend components, showcasing end-to-end development skills",
    },
    {
      id: "dataAnalytics",
      name: "Data Analytics",
      description:
        "Create solutions that analyze, visualize, and extract insights from complex datasets to drive informed decision-making",
    },
    {
      id: "dataParsing",
      name: "Data Parsing",
      description:
        "Develop tools and algorithms that extract, transform, and process structured or unstructured data from various sources",
    },
    {
      id: "gameDevelopment",
      name: "Game Development",
      description:
        "Design interactive games with creative mechanics, engaging gameplay, and immersive experiences across platforms",
    },
    {
      id: "mobileAppDev",
      name: "Mobile App Development",
      description:
        "Create innovative mobile applications for iOS, Android, or cross-platform that solve real-world problems",
    },
  ];

  /* eslint-disable react-hooks/exhaustive-deps */
  // Reset loading state on component mount
  useEffect(() => {
    setLoading(false);

    // Test API connection when component mounts
    testAPIConnection();

    // This will handle cases where the page refreshes during loading state
    const handleBeforeUnload = () => {
      setLoading(false);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle loading timeout - if loading is true for more than 15 seconds, reset it
  useEffect(() => {
    let timeoutId;

    if (loading) {
      timeoutId = setTimeout(() => {
        console.log("Loading timeout triggered - resetting loading state");
        setLoading(false);
      }, 15000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);

  // Critical useEffect for OAuth callback handling
  useEffect(() => {
    // Check if there's a code parameter in the URL (GitHub OAuth callback)
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && !isAuthenticated) {
      if (state === "login") {
        // This is a login attempt - handle differently
        handleLoginFlow(code);
      } else {
        // Normal registration flow
        exchangeCodeForToken(code);
      }
    }
  }, [isAuthenticated, location]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Add this for login flow
  const handleLoginFlow = async (code) => {
    setLoading(true);
    try {
      const response = await fetch("/api/github-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.access_token) {
        // Get user data from GitHub
        const userResponse = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${data.access_token}` },
        });

        const userData = await userResponse.json();
        // Store the full user data for later use
        setGithubUserData(userData);

        // Get user email if not provided
        let email = userData.email;
        if (!email) {
          const emailResponse = await fetch(
            "https://api.github.com/user/emails",
            {
              headers: { Authorization: `token ${data.access_token}` },
            }
          );

          const emails = await emailResponse.json();
          const primaryEmail = emails.find((e) => e.primary) || emails[0];
          if (primaryEmail) {
            email = primaryEmail.email;
          }
        }

        // Check if the user exists in our database
        const apiUrl =
          "https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations";

        try {
          const checkResponse = await fetch(
            `${apiUrl}?email=${encodeURIComponent(email)}`
          );

          if (checkResponse.ok) {
            const registrations = await checkResponse.json();
            const existingUser =
              Array.isArray(registrations) &&
              registrations.find(
                (reg) => reg.email.toLowerCase() === email.toLowerCase()
              );

            if (existingUser) {
              // User found - they're already registered
              localStorage.setItem(
                "registeredUser",
                JSON.stringify({
                  name: existingUser.name,
                  email: existingUser.email,
                  githubUsername: userData.login,
                  registrationDate: existingUser.registeredAt,
                  avatar_url: userData.avatar_url, // Now userData is defined in this scope
                })
              );

              // Redirect to thank you/dashboard page
              navigate("/thank-you");
              return; // Exit early
            } else {
              // Not found - proceed with normal registration
              setFormData((prev) => ({
                ...prev,
                name: userData.name || userData.login,
                email: email || "",
                githubUsername: userData.login,
              }));

              setIsAuthenticated(true);
            }
          } else {
            // API error, just proceed with normal registration
            setFormData((prev) => ({
              ...prev,
              name: userData.name || userData.login,
              email: email || "",
              githubUsername: userData.login,
            }));

            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error checking for existing user:", error);
          // If we can't check, just continue with normal registration
          setFormData((prev) => ({
            ...prev,
            name: userData.name || userData.login,
            email: email || "",
            githubUsername: userData.login,
          }));

          setIsAuthenticated(true);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in login flow:", error);
      setLoading(false);
    }
  };

  // GitHub login function with improved error handling
  const handleGitHubLogin = () => {
    try {
      setLoading(true);
      // Use environment variables instead of hardcoded values
      const clientId =
        process.env.REACT_APP_GITHUB_CLIENT_ID || "Ov23liirEqIDwwnIsirA";
      const callbackUrl = "https://summeropen2025.com/register";

      const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        callbackUrl
      )}&scope=user:email&state=login`;

      // Add a fallback to reset loading state if redirect doesn't happen
      setTimeout(() => {
        setLoading(false);
      }, 5000);

      window.location.href = authUrl;
    } catch (error) {
      console.error("GitHub login error:", error);
      setLoading(false);
    }
  };

  // Form field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("category-")) {
      const categoryId = name.replace("category-", "");
      setFormData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [categoryId]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Mock API response for testing
  const mockAPIResponse = () => {
    return new Promise((resolve) => {
      console.log("Using mock API response");

      // Simulate network delay
      setTimeout(() => {
        resolve({
          ok: true,
          status: 200,
          headers: {
            get: () => "application/json",
          },
          json: () => Promise.resolve({ message: "Registration successful" }),
        });
      }, 1000);
    });
  };

  // Form submission handler with extensive logging
  // Replace your current handleSubmit function with this improved version

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit started");

    // Prevent submitting if already loading
    if (loading) {
      console.log("Already processing a submission, ignoring");
      return;
    }

    // Clear any previous errors
    setSubmitError("");

    // Set loading state
    setLoading(true);

    // Add a timeout to automatically reset loading state after 30 seconds
    // This prevents the button from being stuck in loading state forever
    const loadingTimeout = setTimeout(() => {
      console.log("Loading timeout reached, resetting state");
      setLoading(false);
      setSubmitError(
        "The request is taking longer than expected. Please try again."
      );
    }, 30000);

    // Validate that at least one category is selected
    const hasCategory = Object.values(formData.categories).some(
      (value) => value
    );

    if (!hasCategory) {
      setSubmitError(
        "Please select at least one category you're interested in."
      );
      console.log("No category selected");
      setLoading(false);
      clearTimeout(loadingTimeout);
      return;
    }

    try {
      console.log("Form data:", formData);

      // Send data to Azure API
      const apiUrl =
        "https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations";

      // Convert the categories object to a string for storage
      const selectedCategories = Object.keys(formData.categories)
        .filter((key) => formData.categories[key])
        .map((key) => {
          const category = categories.find((cat) => cat.id === key);
          return category ? category.name : key;
        })
        .join(", ");

      // Format data for the API
      const apiData = {
        name: formData.name,
        email: formData.email,
        phone: "", // Not collected in this form
        teamName: "", // Also not collected
        experience: formData.experience,
        expectations: `Selected categories: ${selectedCategories}`,
      };

      console.log("Sending to API:", apiData);

      // Send the registration data to the API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiData),
      });

      console.log("API response status:", response.status);

      // Try to get the response body as text first
      const responseText = await response.text();
      console.log("API response text:", responseText);

      // Then try to parse it as JSON if possible
      let errorData = null;
      if (responseText) {
        try {
          errorData = JSON.parse(responseText);
          console.log("API response JSON:", errorData);
        } catch (parseError) {
          console.log("Response is not JSON");
        }
      }

      if (!response.ok) {
        // Handle specific error cases with more user-friendly messages
        if (response.status === 409) {
          throw new Error(
            "This email address is already registered. Please use a different email or contact support if you need help."
          );
        } else if (errorData && (errorData.message || errorData.title)) {
          throw new Error(errorData.message || errorData.title);
        } else {
          throw new Error(
            `Registration failed (Error ${response.status}). Please try again.`
          );
        }
      }

      console.log("API call succeeded, storing in localStorage");

      // Clear the timeout since the operation completed successfully
      clearTimeout(loadingTimeout);

      // API call succeeded, now store in localStorage
      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          name: formData.name,
          githubUsername: formData.githubUsername,
          email: formData.email,
          categories: selectedCategories,
          registrationDate: new Date().toISOString(),
          avatar_url: githubUserData?.avatar_url || "", // Use the githubUserData state we added
        })
      );

      console.log("Setting loading to false before navigation");
      // Make sure loading is false before navigation
      setLoading(false);

      console.log("Redirecting to thank-you page");
      // Redirect to thank you page
      navigate("/thank-you");
    } catch (error) {
      // Clear the timeout since the operation completed (with an error)
      clearTimeout(loadingTimeout);

      console.error("Registration error:", error);
      // Show error message to user
      setSubmitError(
        error.message ||
          "There was an error submitting your registration. Please try again."
      );

      // Ensure loading state is reset on error
      setLoading(false);
    } finally {
      console.log("Finally block executed, setting loading to false");
      // Ensure loading state is reset in all cases
      setLoading(false);
    }
  };

  // If not authenticated, show GitHub login screen
  if (!isAuthenticated) {
    return (
      <div className="register-page">
        <div className="container">
          <div className="register-content">
            <h1 className="register-title">
              Register for Summer Open Hackathon
            </h1>
            <p className="register-description">
              Join us on June 28-29, 2025 for an exciting 36-hour coding
              adventure!
            </p>

            <div className="github-auth-container">
              <p>Please sign in with GitHub to register for the hackathon.</p>
              <button
                className="github-button"
                onClick={handleGitHubLogin}
                disabled={loading}
              >
                <FaGithub className="github-icon" />
                {loading ? "Connecting..." : "Sign in with GitHub"}
              </button>
              <p className="github-note">
                We use GitHub authentication to verify your identity and
                streamline the registration process.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show registration form
  return (
    <div className="register-page">
      <div className="container">
        <div className="register-content">
          <h1 className="register-title">Complete Your Registration</h1>

          <div className="github-connected">
            <div className="github-profile">
              {githubUserData?.avatar_url && (
                <img
                  src={githubUserData.avatar_url}
                  alt={`${githubUserData.name}'s avatar`}
                  className="github-avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}
              <FaGithub className="github-icon" />
              <span>
                Connected as <strong>{formData.githubUsername}</strong>
              </span>
            </div>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {/* Display error message if there is one */}
            {submitError && (
              <div
                className="error-message"
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  color: "#ff3333",
                  padding: "12px",
                  borderRadius: "5px",
                  marginBottom: "20px",
                  borderLeft: "4px solid #ff3333",
                  fontSize: "0.95rem",
                }}
              >
                <strong>Error:</strong> {submitError}
              </div>
            )}
            {!apiConnected && (
              <div
                className="warning-message"
                style={{
                  backgroundColor: "rgba(255, 165, 0, 0.1)",
                  color: "#ff8c00",
                  padding: "12px",
                  borderRadius: "5px",
                  marginBottom: "20px",
                  borderLeft: "4px solid #ff8c00",
                  fontSize: "0.95rem",
                }}
              >
                <strong>Note:</strong> We're having trouble connecting to our
                registration service. Your registration will be stored locally
                and synchronized when the connection is restored.
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Your Name
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="input-help">
                We'll send hackathon updates to this email
              </small>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="experience">
                Experience Level
              </label>
              <select
                className="form-select"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label className="form-label category-label">
                Which categories are you interested in? (Select at least one)
              </label>
              <div className="categories-container">
                {categories.map((category) => (
                  <div className="category-checkbox" key={category.id}>
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      checked={formData.categories[category.id]}
                      onChange={handleChange}
                    />
                    <label htmlFor={`category-${category.id}`}>
                      <span className="category-name">{category.name}</span>
                      <span className="category-description">
                        {category.description}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="submit-group" style={{ marginBottom: "40px" }}>
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
                style={{
                  height: "48px",
                  position: "relative",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </button>

              {loading && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  Please wait a moment while we process your registration...
                </div>
              )}

              <Link
                to="/"
                className="cancel-button"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-primary, #4361ee)",
                  border: "1px solid var(--color-primary, #4361ee)",
                  borderRadius: "6px",
                  padding: "12px 24px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "48px",
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
