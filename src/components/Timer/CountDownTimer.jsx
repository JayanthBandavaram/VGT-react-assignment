import { useEffect, useRef, useState } from "react";
import "./CountDownTimer.css";

const DEFAULT_TIME = 10; 

const CountdownTimer = () => {
  const [inputTime, setInputTime] = useState(DEFAULT_TIME);
  const [remainingMs, setRemainingMs] = useState(DEFAULT_TIME * 1000);
  const [status, setStatus] = useState("Idle"); 
  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("timerState"));
    if (!saved) return;

    const { endTime, status } = saved;

    if (status === "Running") {
      const remaining = endTime - Date.now();
      if (remaining > 0) {
        setRemainingMs(remaining);
        setStatus("Running");
        startInterval(endTime);
      } else {
        completeTimer();
      }
    } else {
      setStatus(status);
      setRemainingMs(saved.remainingMs);
    }
  }, []);

  
  const startInterval = (endTime) => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        completeTimer();
      } else {
        setRemainingMs(remaining);
        persistState(endTime, "Running", remaining);
      }
    }, 50);
  };

  
  const startTimer = () => {
    const endTime = Date.now() + inputTime * 1000;
    endTimeRef.current = endTime;

    setStatus("Running");
    startInterval(endTime);
    persistState(endTime, "Running", inputTime * 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setStatus("Paused");
    persistState(endTimeRef.current, "Paused", remainingMs);
  };

  const resumeTimer = () => {
    const newEndTime = Date.now() + remainingMs;
    endTimeRef.current = newEndTime;

    setStatus("Running");
    startInterval(newEndTime);
    persistState(newEndTime, "Running", remainingMs);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    localStorage.removeItem("timerState");

    setRemainingMs(inputTime * 1000);
    setStatus("Idle");
  };

  const completeTimer = () => {
    clearInterval(intervalRef.current);
    setRemainingMs(0);
    setStatus("Completed");
    localStorage.removeItem("timerState");
  };

 
  const persistState = (endTime, status, remainingMs) => {
    localStorage.setItem(
      "timerState",
      JSON.stringify({ endTime, status, remainingMs })
    );
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const millis = ms % 1000;
    return `${seconds}.${String(millis).padStart(3, "0")}s`;
  };

  
  return (
    <div className="timer-container">
      <h2>Advanced Countdown Timer</h2>

      <div className="config">
        <label>Set Time (seconds)</label>
        <input
          type="number"
          min="1"
          value={inputTime}
          disabled={status === "Running"}
          onChange={(e) =>
            setInputTime(Math.max(1, Number(e.target.value)))
          }
        />
      </div>

      <div className="display">
        {formatTime(remainingMs)}
      </div>

      <p className="status">
        Status: <strong>{status}</strong>
      </p>

      {status === "Completed" && (
        <p className="done">⏰ Time’s up!</p>
      )}

      <div className="controls">
        {status !== "Completed" && (
          <button
            onClick={startTimer}
            disabled={status !== "Idle"}
          >
            Start
          </button>
        )}

        <button
          onClick={pauseTimer}
          disabled={status !== "Running"}
        >
          Pause
        </button>

        <button
          onClick={resumeTimer}
          disabled={status !== "Paused"}
        >
          Resume
        </button>

        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
