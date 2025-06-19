import React, { useState } from "react";

export default function App() {
  const [solved, setSolved] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState(null);

  const handleSolve = () => {
    const randomTime = Math.floor(Math.random() * 30) + 5;
    setTime(randomTime);
    setSolved(true);
  };

  return (
    <div style={{ background: "#0f0f0f", color: "#fff", minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#FF3300", marginBottom: "1rem" }}>🔥 Fogo Puzzle Test</h1>

      {!solved ? (
        <button
          onClick={handleSolve}
          style={{
            backgroundColor: "#FF5C00",
            color: "#fff",
            border: "none",
            padding: "1rem 2rem",
            fontSize: "1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Solve Puzzle 🔥
        </button>
      ) : (
        <div>
          <p style={{ fontSize: "1.2rem" }}>
            Congrats! You solved it in <strong>{time}s</strong>.
          </p>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem", borderRadius: "6px" }}
          />
          <button
            style={{
              backgroundColor: "#FF5C00",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit 🔥
          </button>
        </div>
      )}
    </div>
  );
}
