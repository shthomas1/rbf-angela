import React, { useState, useEffect } from "react";
import { FaGithub, FaSignOutAlt} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/pages/UpdateProfile.css";

const UpdateProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "beginner",
    categories: {
      fullStackDev: false,
      dataAnalytics: false,
      dataParsing: false,
      gameDevelopment: false,
      mobileAppDev: false,
    },
  });
  const [submitError, setSubmitError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem("registeredUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setUserData(parsedUser);

          // Populate form data with user information
          setFormData((prev) => ({
            ...prev,
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            experience: parsedUser.experience || "beginner",
            // If we have stored categories, parse them
            categories: parseCategoriesFromString(parsedUser.categories || ""),
          }));
        } catch (e) {
          console.error("Error parsing stored user data", e);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        // Redirect to home if not logged in
        navigate("/");
      }
    };

    checkLoginStatus();
  }, [location, navigate]);

  // Helper function to parse categories string back into object format
  const parseCategoriesFromString = (categoriesString) => {
    const result = {
      fullStackDev: false,
      dataAnalytics: false,
      dataParsing: false,
      gameDevelopment: false,
      mobileAppDev: false,
    };

    if (!categoriesString) return result;

    const categoryNames = categoriesString.split(",").map((cat) => cat.trim());

    if (categoryNames.includes("Full Stack Development"))
      result.fullStackDev = true;
    if (categoryNames.includes("Data Analytics")) result.dataAnalytics = true;
    if (categoryNames.includes("Data Parsing")) result.dataParsing = true;
    if (categoryNames.includes("Game Development"))
      result.gameDevelopment = true;
    if (categoryNames.includes("Mobile App Development"))
      result.mobileAppDev = true;

    return result;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setSubmitError("");

    // Set loading state
    setLoading(true);

    // Validate that at least one category is selected
    const hasCategory = Object.values(formData.categories).some(
      (value) => value
    );

    if (!hasCategory) {
      setSubmitError(
        "Please select at least one category you're interested in."
      );
      setLoading(false);
      return;
    }

    try {
      console.log("Form submitted:", formData);

      // Base API URL
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

      // Format data for the API - now only sending the fields in the UpdateRegistrationDto
      const apiData = {
        name: formData.name,
        phone: userData?.phone || "",
        teamName: userData?.teamName || "",
        experience: formData.experience,
        expectations: `Selected categories: ${selectedCategories}`,
      };

      console.log("Sending to API:", apiData);

      // Use the correct endpoint for update: api/Registrations/user@example.com
      // The API expects the email in the URL for PUT requests
      const updateUrl = `${apiUrl}/${encodeURIComponent(formData.email)}`;

      console.log("Update URL:", updateUrl);

      const response = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      console.log("API response status:", response.status);

      // Some APIs don't return content for successful PUT requests (204 No Content)
      let responseData = null;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
          const responseText = await response.text();
          if (responseText) {
            responseData = JSON.parse(responseText);
            console.log("Response data:", responseData);
          }
        } catch (parseError) {
          console.log("No JSON response or parsing error");
        }
      }

      if (!response.ok) {
        // Handle specific error cases with more user-friendly messages
        if (response.status === 404) {
          throw new Error(
            "Your profile couldn't be found. Please try registering again."
          );
        } else {
          const errorMessage = await handleApiError(response);
          throw new Error(errorMessage);
        }
      }

      // Update succeeded, now update localStorage
      const updatedUserData = {
        ...userData,
        name: formData.name,
        email: formData.email,
        categories: selectedCategories,
        experience: formData.experience,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem("registeredUser", JSON.stringify(updatedUserData));

      // Show success message and redirect
      alert("Your profile has been updated successfully!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Update profile error:", error);
      // Show error message to user
      setSubmitError(
        error.message ||
          "There was an error updating your profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = async (response) => {
    // First try to parse the response as JSON
    let errorMessage = `Error: ${response.status} ${response.statusText}`;

    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const errorData = await response.json();

        // Check for different error formats
        if (errorData.title && errorData.status) {
          // ASP.NET Core ProblemDetails format
          errorMessage = `${errorData.title} (${errorData.status})`;

          // If there are validation errors, include them
          if (errorData.errors) {
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n");

            errorMessage += `\n\nValidation errors:\n${validationErrors}`;
          }
        } else if (errorData.message) {
          // Simple error message format
          errorMessage = errorData.message;
        } else if (typeof errorData === "string") {
          // Plain string error
          errorMessage = errorData;
        }
      }
    } catch (e) {
      // If JSON parsing fails, try to get text content
      try {
        const textContent = await response.text();
        if (textContent && textContent.length < 200) {
          errorMessage = textContent;
        }
      } catch (textError) {
        // If that also fails, just use the status
        console.error("Error reading error response:", textError);
      }
    }

    return errorMessage;
  };

  const handleLogout = () => {
    localStorage.removeItem("registeredUser");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  // If not logged in, redirect (handled in useEffect)
  if (!isLoggedIn) {
    return (
      <div className="update-profile-page">
        <div className="container">
          <div className="profile-content">
            <div className="loading">Checking login status...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="update-profile-page">
      <div className="container">
        <div className="profile-content">
          <h1 className="profile-title">Update Your Profile</h1>

          <div className="github-connected">
            <div className="github-profile">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {userData?.avatar_url && (
                  <img
                    src={userData.avatar_url}
                    alt={`${userData.name}'s avatar`}
                    className="github-avatar"
                  />
                )}
                <FaGithub className="github-icon" />
                <span>
                  Connected as <strong>{userData?.githubUsername}</strong>
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="logout-btn"
                title="Logout"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            {/* Display error message if there is one */}
            {submitError && (
              <div className="error-message">
                <strong>Error:</strong> {submitError}
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

            <div className="submit-group">
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Update Profile"}
              </button>
              <Link to="/thank-you" className="cancel-button">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;