import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-app">
      <h1>Counter App</h1>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button className="btn btn-decrement" onClick={decrement}>
          -
        </button>
        <button className="btn btn-reset" onClick={reset}>
          Reset
        </button>
        <button className="btn btn-increment" onClick={increment}>
          +
        </button>
      </div>
      <div className="counter-message">
        {count > 10 ? (
          <p>Count is getting big</p>
        ) : count < 0 ? (
          <p>Count is negative</p>
        ) : null}
      </div>
    </div>
  );
}

export default App;

// CSS Styles
const styles = `
  body {
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
  }

  .counter-app {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
  }

  h1 {
    color: #333;
    margin-bottom: 1.5rem;
  }

  .counter-display {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 5px;
    color: #2c3e50;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 1.5rem 0;
  }

  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-increment {
    background-color: #2ecc71;
    color: white;
  }

  .btn-increment:hover {
    background-color: #27ae60;
  }

  .btn-decrement {
    background-color: #e74c3c;
    color: white;
  }

  .btn-decrement:hover {
    background-color: #c0392b;
  }

  .btn-reset {
    background-color: #3498db;
    color: white;
  }

  .btn-reset:hover {
    background-color: #2980b9;
  }

  .counter-message {
    height: 20px;
    color: #e74c3c;
    font-weight: bold;
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
