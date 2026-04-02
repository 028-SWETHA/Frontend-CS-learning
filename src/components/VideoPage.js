import React, { useState } from "react";
import "./VideoPage.css";

function VideoPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which of the following is a correct use of the stack in programming?",
      options: ["Breadth-first search", "Undo feature", "Queueing processes", "Multithreading"],
      correctAnswer: "Undo feature",
    },
    {
      id: 2,
      question: "Queue works on which principle?",
      options: ["LIFO", "FIFO", "FILO", "LILO"],
      correctAnswer: "FIFO",
    },
    {
      id: 3,
      question: "In a stack, which operation is used to insert an element?",
      options: ["pop()", "enqueue()", "insert()", "push()"],
      correctAnswer: "push()",
    },
    {
      id: 4,
      question: "Which one is NOT a linear data structure?",
      options: ["Stack", "Queue", "Tree", "Array"],
      correctAnswer: "Tree",
    },
    {
      id: 5,
      question: "Which operation removes an element from a queue?",
      options: ["enqueue()", "insert()", "dequeue()", "push()"],
      correctAnswer: "dequeue()",
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
        <h2>🎥 Stack and Queue - Video</h2>

        <video controls className="video-player">
          <source src="/videos/stack_queue_blender.mp4" type="video/mp4" />
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

export default VideoPage;
