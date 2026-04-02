import React, { useState } from "react";
import "./VideoPage.css";

function OsVideo() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which CPU scheduling algorithm is non-preemptive?",
      options: ["Round Robin", "SJF (Preemptive)", "FCFS", "Priority (Preemptive)"],
      answer: "FCFS",
    },
    {
      id: 2,
      question: "Which scheduling algorithm uses time quantum?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      answer: "Round Robin",
    },
    {
      id: 3,
      question: "Which algorithm gives minimum average waiting time?",
      options: ["FCFS", "SJF", "Round Robin", "Priority"],
      answer: "SJF",
    },
    {
      id: 4,
      question: "What problem occurs in Priority Scheduling?",
      options: ["Deadlock", "Starvation", "Thrashing", "Fragmentation"],
      answer: "Starvation",
    },
    {
      id: 5,
      question: "Which scheduling algorithm is preemptive?",
      options: ["FCFS", "Round Robin", "SJF (Non-preemptive)", "None"],
      answer: "Round Robin",
    },
  ];

  const handleOptionChange = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  // ✅ FIXED SCORE
  const getScore = () =>
    questions.reduce(
      (score, q) => (answers[q.id] === q.answer ? score + 1 : score),
      0
    );

  // ✅ FIXED STORAGE (OS specific)
  const handleSubmit = () => {
    setSubmitted(true);

    const userId = localStorage.getItem("currentUser");

    const videoResults =
      JSON.parse(localStorage.getItem("OsVideoResults")) || {};

    videoResults[userId] = getScore();

    localStorage.setItem("OsVideoResults", JSON.stringify(videoResults));
  };

  return (
    <div className="video-wrapper">
      <div className="video-box">
        <h2>🎥 OS - CPU Scheduling Video</h2>

        <video controls className="video-player">
          <source src="/videos/OS_blender.mp4" type="video/mp4" />
        </video>

        <h3>📝 Quiz</h3>

        {questions.map((q) => (
          <div className="question-box" key={q.id}>
            <p><strong>{q.id}. {q.question}</strong></p>

            {q.options.map((opt, i) => (
              <label className="option" key={i}>
                <span className="option-text">{opt}</span>
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === opt}
                  onChange={() => handleOptionChange(q.id, opt)}
                  disabled={submitted}
                />
              </label>
            ))}
          </div>
        ))}

        {!submitted ? (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        ) : (
          <h4 className="score">
            ✅ You scored {getScore()} / {questions.length}
          </h4>
        )}
      </div>
    </div>
  );
}

export default OsVideo;