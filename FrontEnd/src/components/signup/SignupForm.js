import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null, // Add field for profile picture
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full name is required.";
    if (!formData.dateOfBirth) tempErrors.dateOfBirth = "Date of birth is required.";
    if (!formData.gender) tempErrors.gender = "Gender is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one digit.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      tempErrors.password = "Password must contain at least one special character.";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSubmit = new FormData();
      for (const key in formData) {
        formDataToSubmit.append(key, formData[key]);
      }

      try {
        const response = await fetch("https://backend-blush-five-36.vercel.app/api/signup", {
          method: "POST",
          body: formDataToSubmit,
        });

        if (response.ok) {
          const result = await response.json();
          alert(result.message);
        } else {
          alert("Error submitting the form. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Form contains errors.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>
        {/* Full Name Input */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        {/* Date of Birth Input */}
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
        </div>
        {/* Gender Selection */}
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>
        {/* Profile Picture Input */}
        <div>
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.profilePic && <p className="error">{errors.profilePic}</p>}
        </div>
        {/* Email Input */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        {/* Password Input */}
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        {/* Confirm Password Input */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>
        {/* Sign Up Button */}
        <button type="submit">Sign Up</button>

        {/* Login Redirect */}
        <div className="login-section">
          <p>Already have an account?</p>
          <button
            type="button"
            className="login-button"
            onClick={() => {
              window.location.href = "/login"; // Adjust the URL as needed
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
