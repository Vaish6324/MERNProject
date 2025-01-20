import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import logo from "./logo.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true); // Show loading state

    try {
      const response = await fetch("https://backend-evnhmnefr-vaish6324s-projects.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsLoading(false); // Hide loading state

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        navigate("/home"); // Navigate to the dashboard or desired page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" /> {/* Logo Image */}
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="signup-prompt">
            <span>Don't have an account?</span>
            <button type="button" className="signup-btn" onClick={goToSignup}>
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
