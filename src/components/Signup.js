import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-cs-learning.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("✅ Signup successful! Please login.");
        navigate("/login"); // React navigation
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="icon">🎓</div>
        <h2>Join CS Learning Hub</h2>
        <p className="subtitle">Create your account to get started</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Roll Number</label>
          <input
            type="text"
            name="rollNumber"
            placeholder="Enter your roll number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;