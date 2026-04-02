import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

import TopicDashboard from "./components/TopicDashboard";
import TheoryPage from "./components/TheoryPage";
import VideoPage from "./components/VideoPage";

import AlgorithmDashboard from "./components/AlgorithmDashboard"; // ✅ FIX
import AlgoTheory from "./components/AlgoTheory";
import AlgoVideo from "./components/AlgoVideo";

import OsDashboard from "./components/OsDashboard";
import OsTheory from "./components/OsTheory";
import OsVideo from "./components/OsVideo";


function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* DATA STRUCTURES */}
        <Route
          path="/data-structures"
          element={user ? <TopicDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/data-structures/theory"
          element={user ? <TheoryPage /> : <Navigate to="/" />}
        />
        <Route
          path="/data-structures/video"
          element={user ? <VideoPage /> : <Navigate to="/" />}
        />

        {/* ALGORITHMS */}
        <Route
          path="/algorithms"
          element={user ? <AlgorithmDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/algorithms/theory"
          element={user ? <AlgoTheory /> : <Navigate to="/" />}
        />
        <Route
          path="/algorithms/video"
          element={user ? <AlgoVideo /> : <Navigate to="/" />}
        />
        <Route
          path="/Os"
          element={user ? <OsDashboard /> : <Navigate to="/" />}
        />
        
        <Route
          path="/Os/video"
          element={user ? <OsVideo /> : <Navigate to="/" />}
        />
        <Route
          path="/Os/theory"
          element={user ? <OsTheory /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;