import React, { useState } from "react";
import { saveScore } from "./saveScore";
import Leaderboard from "./Leaderboard";

export default function App() {
  const [time, setTime] = useState(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFinishPuzzle = () => {
    const randomTime = Math.floor(Math.random() * 20) + 5;
    setTime(randomTime);
  };

  const handleSubmit = async () => {
    await saveScore(name, time);
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", padding: "2rem", color: "#fff" }}>
      <h1 style={{ color: "#FF3300" }}>🔥 Fogo Puzzle Challenge</h1>
      {!time && (
        <button onClick={handleFinishPuzzle} style={{ padding: "1rem", background: "#FF5C00", color: "#fff", border: "none", borderRadius: "8px" }}>
          Solve Puzzle 🔥
        </button>
      )}
      {time && !submitted && (
        <>
          <p>You solved it in {time} seconds!</p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button onClick={handleSubmit}>Submit Score</button>
        </>
      )}
      {submitted && <p>🔥 Score submitted! See the leaderboard below 👇</p>}
      <Leaderboard />
    </div>
  );
}
