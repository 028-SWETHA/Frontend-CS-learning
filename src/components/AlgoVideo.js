import React, { useState } from "react";
import "./VideoPage.css";

function AlgoVideo()  {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

const questions = [
    {
      id:1,
      question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      id:2,
      question: "Which sorting algorithm is the fastest on average?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
      answer: "Quick Sort",
    },
    {
      id:3,
      question: "Which algorithm is used to find shortest path?",
      options: ["DFS", "BFS", "Dijkstra", "Bubble Sort"],
      answer: "Dijkstra",
    },
    {
      id:4,
      question: "Worst case of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      answer: "O(n^2)",
    },
    {
      id:5,
      question: "Which sorting is stable?",
      options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
      answer: "Merge Sort",
    },
  ];


  const handleOptionChange = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const getScore = () =>
    questions.reduce(
      (score, q) => (answers[q.id] === q.correctAnswer ? score + 1 : score),
      0
    );

 const handleSubmit = () => {
  setSubmitted(true);

  const userId = localStorage.getItem("currentUser");

  const videoResults =
    JSON.parse(localStorage.getItem("videoResults")) || {};

  videoResults[userId] = getScore();

  localStorage.setItem("videoResults", JSON.stringify(videoResults));
};

  return (
    <div className="video-wrapper">
      <div className="video-box">
        <h2>🎥 Sorting- Video</h2>

        <video controls className="video-player">
          <source src="/videos/sort_blender.mp4" type="video/mp4" />
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
          <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
        ) : (
          <h4 className="score">✅ You scored {getScore()} / {questions.length}</h4>
        )}
      </div>
    </div>
  );
}

export default AlgoVideo;
