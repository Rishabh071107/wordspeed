import React, { useState, useRef, useEffect, useMemo } from "react";
import './App.css';

function App() {
  const text = "practice makes a man perfect";
  const [time, setTime] = useState(0);
  const [input, setInput] = useState("");
  const timeRef = useRef(null);

 
  const startTimer = () => {
    if (!timeRef.current) {
      timeRef.current = setInterval(() => setTime(t => t + 1), 1000);
    }
  };

  
  const stopTimer = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
  };

 
  useEffect(() => {
    if (input === text) {
      stopTimer();
    }
  }, [input]);

  const reset = () => {
    stopTimer();
    setTime(0);
    setInput("");
  };


  const accuracy = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++;
    }
    return ((correct / text.length) * 100).toFixed(1);
  }, [input]);

  const wpm = useMemo(() => {
    const words = input.trim().split(/\s+/).filter(Boolean).length;
    return time > 0 ? ((words / time) * 60).toFixed(1) : 0;
  }, [input, time]);

  return (
    <div >
      <h1 >⌨️ Typing Speed Tester</h1>
      <h2>Target:</h2>
      <h3>{text}</h3>

      <h2>Input:</h2>
      <input
        type="text"
        value={input}
        placeholder="Enter the text here"
        onChange={(e) => {
          setInput(e.target.value);
          startTimer();
        }}
     
      />

      <div style={{ marginTop: "20px" }}>
        <p>Time: {time}s</p>
        <p>Accuracy: {accuracy}%</p>
        <p>WPM: {wpm}</p>
      </div>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
