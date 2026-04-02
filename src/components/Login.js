import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-cs-learning.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNumber, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Welcome ${data.user.name}!`);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("currentUser", data.user.rollNumber);

        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-circle">🎓</div>
        <h1 className="login-title">CS Learning Hub</h1>
        <p className="login-subtitle">
          Login to explore interactive CS concepts
        </p>

        <form onSubmit={handleLogin}>
          <label>Roll Number</label>
          <input
            type="text"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;