import { useState } from "react";
import "./MultiProgressBar.css";

const clampValue = (value) => {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

const getColor = (value) => {
  if (value < 40) return "#ef4444";   
  if (value < 70) return "#008000";                    
};

const ProgressDashboard = () => {
  const [values, setValues] = useState([30, 60, 90]);

  const handleChange = (index, input) => {
    const numericValue = clampValue(Number(input) || 0);
    const updated = [...values];
    updated[index] = numericValue;
    setValues(updated);
  };

  const average =
    values.reduce((sum, val) => sum + val, 0) / values.length;

  return (
    <div className="progress-container">
      <h2 className="title">Progress Dashboard</h2>

      <div className="inputs">
        {values.map((value, index) => (
          <div key={index} className="input-group">
            <label>Input {index + 1}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

   
      <div className="main-bar">
        <div
          className="main-fill"
          style={{
            width: `${average}%`,
            backgroundColor: getColor(average),
          }}
        />
      </div>

      <p className="average-text">
        Overall Progress: {Math.round(average)}%
      </p>

  
      <div className="sub-bars">
        {values.map((value, index) => (
          <div key={index} className="sub-bar">
            <span>Input {index + 1}</span>
            <div className="sub-track">
              <div
                className="sub-fill"
                style={{
                  width: `${value}%`,
                  backgroundColor: getColor(value),
                }}
              />
            </div>
            <span>{value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressDashboard;
