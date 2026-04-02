import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopicDashboard.css";

function TopicDashboard() {
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
     
      <h2>📘 Data Structures Dashboard</h2>

      <div className="section-cards">
        <div className="card" onClick={() => navigate("/data-structures/theory")}>
          <h3>Stack & Queue — Theory</h3>
          <p>Read concepts and test your understanding.</p>
        </div>

        <div className="card" onClick={() => navigate("/data-structures/video")}>
          <h3>Stack & Queue — Video</h3>
          <p>Watch Blender-based explanation and quiz.</p>
        </div>
      </div>

      
    </div>
    
    
  );
}


export default TopicDashboard;
