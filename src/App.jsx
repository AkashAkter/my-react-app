import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [trend, setTrend] = useState(null);
  const [lastCount, setLastCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeCount = (newCount) => {
    setLastCount(count);
    setCount(newCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const increment = () => changeCount(count + 1);
  const decrement = () => changeCount(count - 1);
  const reset = () => changeCount(0);
  const random = () => changeCount(Math.floor(Math.random() * 201) - 100);

  useEffect(() => {
    setTrend(count > lastCount ? "up" : count < lastCount ? "down" : null);
  }, [count, lastCount]);

  return (
    <div className="counter-app">
      <h1>Elevate Counter</h1>
      <p className="app-description">A refined counting experience</p>

      <div className={`counter-display ${trend} ${isAnimating ? "pulse" : ""}`}>
        <div className="counter-value">{count}</div>
        <div className="counter-trend">
          {trend === "up" && <span className="trend-up">▲</span>}
          {trend === "down" && <span className="trend-down">▼</span>}
        </div>
      </div>

      <div className="button-group">
        <button
          className="btn btn-decrement"
          onClick={decrement}
          aria-label="Decrease value"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" fill="currentColor" />
          </svg>
        </button>
        <button
          className="btn btn-reset"
          onClick={reset}
          aria-label="Reset to zero"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          className="btn btn-increment"
          onClick={increment}
          aria-label="Increase value"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <button
        className="btn btn-random"
        onClick={random}
        aria-label="Random value"
      >
        Random
      </button>

      <div className="counter-meta">
        <div className="meta-item">
          <span className="meta-label">Parity:</span>
          <span className="meta-value">{count % 2 === 0 ? "Even" : "Odd"}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Sign:</span>
          <span className="meta-value">
            {count > 0 ? "Positive" : count < 0 ? "Negative" : "Zero"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

// CSS Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  
  :root {
    --primary: #4361ee;
    --primary-dark: #3a56d4;
    --secondary: #3f37c9;
    --danger: #f72585;
    --success: #4cc9f0;
    --dark: #212529;
    --light: #f8f9fa;
    --border-radius: 12px;
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background-color: #f5f7ff;
    color: var(--dark);
    line-height: 1.6;
  }
  
  .counter-app {
    width: 100%;
    max-width: 380px;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  
  .counter-app::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--primary), var(--secondary));
  }
  
  h1 {
    font-weight: 600;
    font-size: 1.75rem;
    margin: 0 0 0.25rem;
    color: var(--dark);
  }
  
  .app-description {
    font-size: 0.875rem;
    color: #6c757d;
    margin: 0 0 1.5rem;
  }
  
  .counter-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background-color: var(--light);
    border-radius: var(--border-radius);
    position: relative;
    transition: var(--transition);
  }
  
  .counter-display.up {
    background-color: rgba(76, 201, 240, 0.1);
  }
  
  .counter-display.down {
    background-color: rgba(247, 37, 133, 0.1);
  }
  
  .counter-display.pulse {
    animation: pulse 0.3s ease;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  .counter-value {
    font-size: 3.5rem;
    font-weight: 300;
    letter-spacing: -1px;
    color: var(--dark);
  }
  
  .counter-trend {
    font-size: 1.25rem;
    opacity: 0.8;
  }
  
  .trend-up {
    color: var(--success);
  }
  
  .trend-down {
    color: var(--danger);
  }
  
  .button-group {
    display: flex;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }
  
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    flex: 1;
  }
  
  .btn:hover {
    transform: translateY(-2px);
  }
  
  .btn:active {
    transform: translateY(0);
  }
  
  .btn-increment {
    background-color: var(--primary);
    color: white;
  }
  
  .btn-increment:hover {
    background-color: var(--primary-dark);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
  }
  
  .btn-decrement {
    background-color: var(--danger);
    color: white;
  }
  
  .btn-decrement:hover {
    box-shadow: 0 5px 15px rgba(247, 37, 133, 0.3);
  }
  
  .btn-reset {
    background-color: #e9ecef;
    color: #495057;
  }
  
  .btn-reset:hover {
    background-color: #dee2e6;
    box-shadow: 0 5px 15px rgba(108, 117, 125, 0.1);
  }
  
  .btn-random {
    width: 100%;
    background-color: white;
    color: var(--primary);
    border: 1px solid #dee2e6;
    margin-bottom: 1.5rem;
  }
  
  .btn-random:hover {
    border-color: var(--primary);
    box-shadow: 0 5px 15px rgba(67, 97, 238, 0.1);
  }
  
  .counter-meta {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
  }
  
  .meta-item {
    flex: 1;
    text-align: center;
  }
  
  .meta-label {
    display: block;
    font-size: 0.75rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
  }
  
  .meta-value {
    font-weight: 500;
    color: var(--dark);
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
