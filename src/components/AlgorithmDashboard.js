import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopicDashboard.css";

function AlgorithmDashboard() {
  const navigate = useNavigate();

  return (
    <div className="topic-dashboard">
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#3b82f6",
          color: "white",
          cursor: "pointer"
        }}
      >
        ⬅ Back to Dashboard
      </button>

      <h2>⚡ Algorithms Dashboard</h2>

      <div className="section-cards">
        <div
          className="card"
          onClick={() => navigate("/algorithms/theory")}
        >
          <h3>Sorting & Searching — Theory</h3>
          <p>Read concepts and test your understanding.</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/algorithms/video")}
        >
          <h3>Sorting & Searching — Video</h3>
          <p>Watch explanation and quiz.</p>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmDashboard;