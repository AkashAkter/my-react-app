import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(0);

  return (
    <div className="card">
      <h1>Counter App</h1>
      <h2>Count: {count}</h2>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleIncrement}>+</button>
      </div>

      <p style={{ marginTop: "20px" }}>
        Edit <code>src/App.jsx</code> and save to test.
      </p>
    </div>
  );
}

export default App;
