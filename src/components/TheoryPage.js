import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ FIXED
import "./TheoryPage.css";
import "./TopicDashboard.css";

function TheoryPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();   // ✅ FIXED

  const questions = [
    {
      id: 1,
      question: "What does LIFO stand for in stack?",
      options: ["Last In First Out", "Last In Fast Out", "First In Last Out", "Fast In Fast Out"],
      correctAnswer: "Last In First Out",
    },
    {
      id: 2,
      question: "Which operation removes the top element in a stack?",
      options: ["enqueue()", "pop()", "dequeue()", "push()"],
      correctAnswer: "pop()",
    },
    {
      id: 3,
      question: "What does FIFO stand for in queue?",
      options: ["Fast In Fast Out", "First In First Out", "First In Few Out", "Fast In First Out"],
      correctAnswer: "First In First Out",
    },
    {
      id: 4,
      question: "Which data structure is used in function call stack?",
      options: ["Queue", "Tree", "Stack", "Graph"],
      correctAnswer: "Stack",
    },
    {
      id: 5,
      question: "What operation adds an element at the rear in a queue?",
      options: ["push()", "dequeue()", "pop()", "enqueue()"],
      correctAnswer: "enqueue()",
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

        <h2>📖 Stack and Queue - Theory</h2>

        <h3>STACK</h3>
        <p><b>Definition:</b> A collection of elements that follows LIFO.</p>
        <ul>
          <li>Push – Add element</li>
          <li>Pop – Remove top element</li>
          <li>Peek – View top element</li>
        </ul>

        <h3>QUEUE</h3>
        <p><b>Definition:</b> A linear data structure following FIFO.</p>
        <ul>
          <li>Enqueue – Add element</li>
          <li>Dequeue – Remove element</li>
          <li>Peek – View first element</li>
        </ul>

        <h3>📝 Quiz</h3>

        {questions.map((q) => (
          <div className="question-box" key={q.id}>
            <p><b>{q.id}. {q.question}</b></p>

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
          <h4 className="score">✅ Score: {getScore()} / {questions.length}</h4>
        )}

      </div>
    </div>
  );
}

export default TheoryPage;