import React, { useState } from "react";
import "./TheoryPage.css";

function AlgoTheory() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: "O(log n)",
    },
    {
      id: 2,
      question: "Which sorting algorithm is the fastest on average?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Selection Sort"],
      answer: "Quick Sort",
    },
    {
      id: 3,
       question: "Which algorithm is used to find shortest path?",
      options: ["DFS", "BFS", "Dijkstra", "Bubble Sort"],
      answer: "Dijkstra",
    },
    {
      id: 4,
        question: "Worst case of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      answer: "O(n^2)",
    },
    {
      id: 5,
      question: "Which sorting is stable?",
      options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
      answer: "Merge Sort",
    },
  ];

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const getScore = () =>
    questions.reduce(
      (score, q) => (answers[q.id] === q.correctAnswer ? score + 1 : score),
      0
    );

const handleSubmit = () => {
  setSubmitted(true);

  const userId = localStorage.getItem("currentUser");

  const theoryResults =
    JSON.parse(localStorage.getItem("theoryResults")) || {};

  theoryResults[userId] = getScore();

  localStorage.setItem("theoryResults", JSON.stringify(theoryResults));
};

  return (
    <div className="theory-wrapper">
      <div className="theory-box">
      <h2>📖 Sorting Algorithms - Theory</h2>

<h3>MERGE SORT</h3>
<p><b>Definition:</b> A divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them.</p>
<ul>
  <li>Divide – Split array into two halves</li>
  <li>Conquer – Recursively sort both halves</li>
  <li>Merge – Combine sorted halves</li>
</ul>
<p><b>Time Complexity:</b> O(n log n)</p>
<p><b>Space Complexity:</b> O(n)</p>

<h3>SELECTION SORT</h3>
<p><b>Definition:</b> A simple sorting algorithm that repeatedly selects the minimum element and places it at the beginning.</p>
<ul>
  <li>Find minimum element in unsorted part</li>
  <li>Swap with first unsorted element</li>
  <li>Repeat for remaining elements</li>
</ul>
<p><b>Time Complexity:</b> O(n²)</p>
<p><b>Space Complexity:</b> O(1)</p>

  <h3>📝 Quiz</h3>
  {questions.map((q) => (
  <div className="question-box" key={q.id}>
  <p><b>{q.id}. {q.question}</b></p>
  {q.options.map((opt, i) => (
  <label className="option">
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
          <h4 className="score">✅ Score: {getScore()} / {questions.length}</h4>
        )}
      </div>
    </div>
  );
}


export default AlgoTheory;
