import { useState, useEffect } from "react";

const OPERATIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  SQUARE: "SQUARE",
  FIBONACCI: "FIBONACCI",
  PRIME: "PRIME",
  RESET: "RESET",
};

const COLOR_PALETTE = {
  primary: "#6C5CE7",
  secondary: "#00CEFF",
  accent: "#FD79A8",
  dark: "#2D3436",
  light: "#F5F6FA",
  success: "#00B894",
  danger: "#D63031",
  warning: "#FDCB6E",
  info: "#0984E3",
};

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [visualizationData, setVisualizationData] = useState([]);

  // Mathematical algorithms
  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
  };

  const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  // Operation handlers
  const performOperation = (operation) => {
    let newValue;
    switch (operation) {
      case OPERATIONS.INCREMENT:
        newValue = count + 1;
        break;
      case OPERATIONS.DECREMENT:
        newValue = count - 1;
        break;
      case OPERATIONS.SQUARE:
        newValue = Math.pow(count, 2);
        break;
      case OPERATIONS.FIBONACCI:
        newValue = fibonacci(Math.abs(count));
        break;
      case OPERATIONS.PRIME:
        newValue = isPrime(count) ? count : count + 1;
        while (!isPrime(newValue)) newValue++;
        break;
      case OPERATIONS.RESET:
        newValue = 0;
        break;
      default:
        newValue = count;
    }

    setCount(newValue);
    setHistory((prev) => [
      ...prev.slice(-9),
      { operation, prevValue: count, newValue },
    ]);
  };

  // Generate visualization data
  useEffect(() => {
    const generateData = () => {
      const data = [];
      const base = Math.abs(count) || 1;

      for (let i = 0; i < 10; i++) {
        data.push({
          x: i,
          y: (base * i) % 10,
          r: ((base + i) % 5) + 1,
          color: `hsl(${(count * 10 + i * 36) % 360}, 70%, 60%)`,
        });
      }
      return data;
    };

    setVisualizationData(generateData());
  }, [count]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <style>{`
        :root {
          --primary: ${COLOR_PALETTE.primary};
          --secondary: ${COLOR_PALETTE.secondary};
          --accent: ${COLOR_PALETTE.accent};
          --text: ${darkMode ? COLOR_PALETTE.light : COLOR_PALETTE.dark};
          --bg: ${darkMode ? COLOR_PALETTE.dark : COLOR_PALETTE.light};
          --card-bg: ${darkMode ? "#3A4042" : "#FFFFFF"};
          --success: ${COLOR_PALETTE.success};
          --danger: ${COLOR_PALETTE.danger};
          --warning: ${COLOR_PALETTE.warning};
          --info: ${COLOR_PALETTE.info};
        }
      `}</style>

      <div className="app-header">
        <h1>Algorithmic Counter</h1>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="counter-display-container">
        <div
          className="counter-display"
          style={{
            color:
              count > 0
                ? COLOR_PALETTE.success
                : count < 0
                ? COLOR_PALETTE.danger
                : COLOR_PALETTE.info,
          }}
        >
          {count}
        </div>
        <div className="counter-meta">
          {isPrime(count) && <span className="tag prime">Prime</span>}
          {count === fibonacci(count) && (
            <span className="tag fibonacci">Fibonacci</span>
          )}
          {Math.sqrt(count) % 1 === 0 && (
            <span className="tag square">Perfect Square</span>
          )}
        </div>
      </div>

      <div className="visualization">
        {visualizationData.map((point, i) => (
          <div
            key={i}
            className="data-point"
            style={{
              width: `${point.r * 5}px`,
              height: `${point.r * 5}px`,
              backgroundColor: point.color,
              transform: `translate(${point.x * 30}px, ${point.y * 5}px)`,
            }}
          />
        ))}
      </div>

      <div className="operations-grid">
        <button
          className="op-btn increment"
          onClick={() => performOperation(OPERATIONS.INCREMENT)}
        >
          + Increment
        </button>
        <button
          className="op-btn decrement"
          onClick={() => performOperation(OPERATIONS.DECREMENT)}
        >
          - Decrement
        </button>
        <button
          className="op-btn square"
          onClick={() => performOperation(OPERATIONS.SQUARE)}
        >
          x² Square
        </button>
        <button
          className="op-btn fibonacci"
          onClick={() => performOperation(OPERATIONS.FIBONACCI)}
        >
          Fib(n)
        </button>
        <button
          className="op-btn prime"
          onClick={() => performOperation(OPERATIONS.PRIME)}
        >
          Next Prime
        </button>
        <button
          className="op-btn reset"
          onClick={() => performOperation(OPERATIONS.RESET)}
        >
          ↻ Reset
        </button>
      </div>

      <div className="history-panel">
        <h3>Operation History</h3>
        <div className="history-items">
          {history.length === 0 ? (
            <div className="empty-history">No operations yet</div>
          ) : (
            history.map((item, index) => (
              <div key={index} className="history-item">
                <span className="op-type">{item.operation}</span>
                <span className="op-values">
                  {item.prevValue} → {item.newValue}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          transition: background-color 0.3s, color 0.3s;
        }

        body {
          font-family: "Segoe UI", "Roboto", sans-serif;
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .app-container {
          width: 100%;
          max-width: 800px;
          background-color: var(--card-bg);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .dark-mode {
          --primary: #a683e6;
          --secondary: #6ecbf5;
          --accent: #ff8eaf;
          --text: #f5f6fa;
          --bg: #1e272e;
          --card-bg: #2d3436;
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        h1 {
          color: var(--primary);
          font-size: 2rem;
          font-weight: 700;
        }

        .mode-toggle {
          background: var(--primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .counter-display-container {
          text-align: center;
          margin-bottom: 30px;
        }

        .counter-display {
          font-size: 5rem;
          font-weight: 700;
          margin: 20px 0;
          font-family: "Fira Code", monospace;
        }

        .counter-meta {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .tag {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .prime {
          background-color: var(--success);
          color: white;
        }

        .fibonacci {
          background-color: var(--warning);
          color: var(--dark);
        }

        .square {
          background-color: var(--info);
          color: white;
        }

        .visualization {
          height: 100px;
          position: relative;
          margin: 40px 0;
          border-radius: 8px;
          background-color: ${darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)"};
          overflow: hidden;
        }

        .data-point {
          position: absolute;
          border-radius: 50%;
          transition: all 0.5s ease-out;
        }

        .operations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .op-btn {
          padding: 15px;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .op-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .increment {
          background-color: var(--success);
          color: white;
        }

        .decrement {
          background-color: var(--danger);
          color: white;
        }

        .square {
          background-color: var(--primary);
          color: white;
        }

        .fibonacci {
          background-color: var(--accent);
          color: white;
        }

        .prime {
          background-color: var(--info);
          color: white;
        }

        .reset {
          background-color: var(--warning);
          color: var(--dark);
          grid-column: span 3;
        }

        .history-panel {
          background-color: ${darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.05)"};
          border-radius: 10px;
          padding: 20px;
        }

        .history-panel h3 {
          margin-bottom: 15px;
          color: var(--primary);
        }

        .history-items {
          max-height: 200px;
          overflow-y: auto;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid
            ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"};
        }

        .op-type {
          font-weight: 600;
          color: var(--secondary);
        }

        .op-values {
          font-family: "Fira Code", monospace;
        }

        .empty-history {
          text-align: center;
          color: ${darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"};
          padding: 20px;
        }

        @media (max-width: 600px) {
          .operations-grid {
            grid-template-columns: 1fr 1fr;
          }

          .reset {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
