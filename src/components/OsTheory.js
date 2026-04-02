import React, { useState } from "react";
import "./TheoryPage.css";

function OsTheory() {
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
      <h2>📖 CPU SCHEDULING Algorithms - Theory</h2>

<h3>FCFS (First Come First Serve)</h3>
<p><b>Definition:</b> Processes are executed in the order they arrive.</p>
<ul>
  <li>Simple and easy to implement</li>
  <li>Non-preemptive scheduling</li>
  <li>May cause long waiting time (convoy effect)</li>
</ul>
<p><b>Time Complexity:</b> O(n)</p>

<h3>SJF (Shortest Job First)</h3>
<p><b>Definition:</b> Process with the smallest execution time is selected first.</p>
<ul>
  <li>Can be preemptive or non-preemptive</li>
  <li>Minimizes average waiting time</li>
  <li>Difficult to predict burst time</li>
</ul>
<p><b>Time Complexity:</b> O(n log n)</p>

<h3>ROUND ROBIN</h3>
<p><b>Definition:</b> Each process is assigned a fixed time slice (time quantum) in a cyclic order.</p>
<ul>
  <li>Preemptive scheduling</li>
  <li>Fair for all processes</li>
  <li>Performance depends on time quantum</li>
</ul>
<p><b>Time Complexity:</b> O(n)</p>

<h3>PRIORITY SCHEDULING</h3>
<p><b>Definition:</b> Processes are executed based on priority.</p>
<ul>
  <li>Can be preemptive or non-preemptive</li>
  <li>Higher priority executes first</li>
  <li>May cause starvation</li>
</ul>
<p><b>Time Complexity:</b> O(n log n)</p>
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


export default OsTheory;
