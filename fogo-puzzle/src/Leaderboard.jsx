import React, { useEffect, useState } from "react";
import { getTopScores } from "./getLeaderboard";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getTopScores().then(setScores);
  }, []);

  return (
    <div style={{ backgroundColor: "#1a1a1a", color: "#fff", padding: "1rem", borderRadius: "12px" }}>
      <h2 style={{ color: "#ff5c00" }}>🔥 Fogo Leaderboard</h2>
      <ol>
        {scores.map((score, i) => (
          <li key={i}>
            <strong>{score.name}</strong> – {score.time}s
            {i === 0 && " 🥇"}
            {i === 1 && " 🥈"}
            {i === 2 && " 🥉"}
          </li>
        ))}
      </ol>
    </div>
  );
}
