import React, { useEffect, useState } from "react";
import { submitScore } from "./submitScore";
import { fetchTopScores } from "./fetchScores";

export default function App() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchTopScores().then(setLeaderboard);
  }, []);

  const handleSubmit = async () => {
    if (!name || !score) return;
    await submitScore(name, Number(score));
    const updated = await fetchTopScores();
    setLeaderboard(updated);
    setName("");
    setScore("");
  };

  return (
    <div style={{ background: "#0f0f0f", color: "#fff", minHeight: "100vh", padding: "2rem", fontFamily: "Orbitron, sans-serif" }}>
      <h1 style={{ color: "#FF3300", fontSize: "2.5rem" }}>🔥 Fogo Arena</h1>
      <p style={{ color: "#ffae42", marginBottom: "1.5rem" }}>
        You either make the leaderboard — or burn trying.
      </p>

      {/* Form */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            marginRight: "0.5rem",
            background: "#1c1c1c",
            color: "#fff",
            border: "1px solid #333",
          }}
        />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Your Score"
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            marginRight: "0.5rem",
            background: "#1c1c1c",
            color: "#fff",
            border: "1px solid #333",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#FF5C00",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Score 🔥
        </button>
      </div>

      {/* Leaderboard */}
      <div style={{ background: "#1a1a1a", padding: "1rem", borderRadius: "12px" }}>
        <h2 style={{ color: "#ff5c00", marginBottom: "1rem" }}>🔥 Leaderboard</h2>
        <ol style={{ paddingLeft: "1rem", lineHeight: "2", listStyle: "decimal" }}>
          {leaderboard.length === 0 && <p>No scores yet. Be the first to burn!</p>}
          {leaderboard.map((entry, index) => (
            <li key={index}>
              <span style={{ fontWeight: "bold", color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "#fff" }}>
                {entry.name}
              </span>{" "}
              — <span style={{ color: "#ffae42" }}>{entry.score}</span>
              {index === 0 && " 🥇"}
              {index === 1 && " 🥈"}
              {index === 2 && " 🥉"}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
