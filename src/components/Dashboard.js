import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const currentUser = localStorage.getItem("currentUser");

  // ✅ FIX: Safe navigation using useEffect
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // 🛑 Prevent blank crash
  if (!currentUser) return null;

  // 📊 FETCH RESULTS
  const theoryResults =
    JSON.parse(localStorage.getItem("theoryResults")) || {};
  const videoResults =
    JSON.parse(localStorage.getItem("videoResults")) || {};
  const algoTheoryResults =
    JSON.parse(localStorage.getItem("algoTheoryResults")) || {};
  const algoVideoResults =
    JSON.parse(localStorage.getItem("algoVideoResults")) || {};
  const osTheoryResults =
    JSON.parse(localStorage.getItem("OsTheoryResults")) || {};
  const osVideoResults =
    JSON.parse(localStorage.getItem("OsVideoResults")) || {};

  const theoryScore = theoryResults[currentUser];
  const videoScore = videoResults[currentUser];
  const algoTheoryScore = algoTheoryResults[currentUser];
  const algoVideoScore = algoVideoResults[currentUser];
  const OsTheoryScore = osTheoryResults[currentUser];
  const OsVideoScore = osVideoResults[currentUser];

  // 📈 CALCULATIONS
  const listening =
    videoScore !== undefined ? Math.round((videoScore / 5) * 100) : null;

  const concentration =
    theoryScore !== undefined ? Math.round((theoryScore / 5) * 100) : null;

  let videoSkill = null;
  if (theoryScore !== undefined && videoScore !== undefined) {
    if (videoScore > theoryScore) videoSkill = "HIGH";
    else if (videoScore < theoryScore) videoSkill = "LOW";
    else videoSkill = "AVERAGE";
  }

  let algoSkill = null;
  if (algoTheoryScore !== undefined && algoVideoScore !== undefined) {
    if (algoVideoScore > algoTheoryScore) algoSkill = "HIGH";
    else if (algoVideoScore < algoTheoryScore) algoSkill = "LOW";
    else algoSkill = "AVERAGE";
  }

  let osSkill = null;
  if (OsTheoryScore !== undefined && OsVideoScore !== undefined) {
    if (OsVideoScore > OsTheoryScore) osSkill = "HIGH";
    else if (OsVideoScore < OsTheoryScore) osSkill = "LOW";
    else osSkill = "AVERAGE";
  }

  // 🔀 NAVIGATION
  const handleDataStructuresClick = () => {
    navigate("/data-structures");
  };

  const handleAlgorithmsClick = () => {
    navigate("/algorithms");
  };

  const handleOsClick = () => {
    navigate("/Os");
  };

  // 📊 CHART DATA
  const barData = {
    labels: [
      "DS Theory",
      "DS Video",
      "Algo Theory",
      "Algo Video",
      "OS Theory",
      "OS Video",
    ],
    datasets: [
      {
        label: "Score (out of 5)",
        data: [
          theoryScore ?? 0,
          videoScore ?? 0,
          algoTheoryScore ?? 0,
          algoVideoScore ?? 0,
          OsTheoryScore ?? 0,
          OsVideoScore ?? 0,
        ],
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  // 🔐 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleSwitchUser = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <h2>Welcome to CS Learning Hub 🎓</h2>

        {user ? (
          <div className="user-info">
            <span>{user.name}</span> | <span>{user.rollNumber}</span>
          </div>
        ) : (
          <p>Please login again.</p>
        )}
      </header>

      {/* MAIN */}
      <main className="dashboard-content">
        <h3>Explore Topics</h3>

        <ul>
          <li onClick={handleDataStructuresClick} style={{ cursor: "pointer", color: "blue" }}>
            Data Structures — Arrays & Linked Lists
          </li>

          <li onClick={handleAlgorithmsClick} style={{ cursor: "pointer", color: "blue" }}>
            Algorithms — Sorting & Searching
          </li>

          <li onClick={handleOsClick} style={{ cursor: "pointer", color: "blue" }}>
            Operating System — CPU Scheduling
          </li>
        </ul>

        {(theoryScore !== undefined ||
          videoScore !== undefined ||
          algoTheoryScore !== undefined ||
          algoVideoScore !== undefined ||
          OsTheoryScore !== undefined ||
          OsVideoScore !== undefined) && (
          <div className="quiz-performance">
            <h3>📊 Learning Analytics</h3>

            <div className="score-box">
              <div className="score-card">
                <h4>🧠 Concentration</h4>
                <p>{concentration !== null ? `${concentration}%` : "N/A"}</p>
              </div>

              <div className="score-card">
                <h4>🎧 Listening</h4>
                <p>{listening !== null ? `${listening}%` : "N/A"}</p>
              </div>
            </div>

            {videoSkill && (
              <p className="quiz-result">
                {videoSkill === "HIGH"
                  ? "🎥 Video learning skill is HIGH"
                  : videoSkill === "LOW"
                  ? "📘 Theory-based learning is stronger"
                  : "🤝 Balanced learning style"}
              </p>
            )}

            {algoSkill && (
              <p className="quiz-result">
                ⚡ Algorithm learning: {algoSkill}
              </p>
            )}

            {osSkill && (
              <p className="quiz-result">
                🖥️ OS learning: {osSkill}
              </p>
            )}

            <div className="chart-box">
              <h4>Quiz Score Comparison</h4>

              <div style={{
                width: "400px",
                height: "250px",
                margin: "20px auto",
                background: "#fff",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleLogout} style={{ marginRight: "10px" }}>
            Logout
          </button>

          <button onClick={handleSwitchUser}>
            Switch User
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;