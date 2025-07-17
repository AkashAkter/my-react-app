import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [emoji, setEmoji] = useState("😊");
  const [history, setHistory] = useState([]);
  const [isBouncing, setIsBouncing] = useState(false);

  const increment = () => {
    setCount(count + 1);
    setHistory([...history.slice(-4), count + 1]);
    bounce();
  };

  const decrement = () => {
    setCount(count - 1);
    setHistory([...history.slice(-4), count - 1]);
    bounce();
  };

  const reset = () => {
    setCount(0);
    setHistory([...history.slice(-4), 0]);
    bounce();
  };

  const random = () => {
    const randomValue = Math.floor(Math.random() * 101) - 50;
    setCount(randomValue);
    setHistory([...history.slice(-4), randomValue]);
    bounce();
  };

  const bounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  useEffect(() => {
    if (count > 20) setEmoji("🚀");
    else if (count > 10) setEmoji("😎");
    else if (count > 0) setEmoji("😊");
    else if (count === 0) setEmoji("🤔");
    else if (count > -10) setEmoji("😕");
    else setEmoji("😱");
  }, [count]);

  return (
    <div className="counter-app">
      <h1>Emoji Counter</h1>
      <div className={`emoji-display ${isBouncing ? "bounce" : ""}`}>
        {emoji}
      </div>
      <div className={`counter-display ${count < 0 ? "negative" : ""}`}>
        {count}
      </div>

      <div className="button-group">
        <button className="btn btn-decrement" onClick={decrement}>
          Decrease
        </button>
        <button className="btn btn-random" onClick={random}>
          Random
        </button>
        <button className="btn btn-increment" onClick={increment}>
          Increase
        </button>
      </div>

      <button className="btn btn-reset" onClick={reset}>
        Reset to Zero
      </button>

      <div className="counter-message">
        {count > 20 ? (
          <p>To infinity and beyond! 🚀</p>
        ) : count > 10 ? (
          <p>You're on fire! 🔥</p>
        ) : count < -10 ? (
          <p>Danger zone! ⚠️</p>
        ) : count < 0 ? (
          <p>Below zero! ❄️</p>
        ) : null}
      </div>

      {history.length > 0 && (
        <div className="history">
          <p>Recent values:</p>
          <div className="history-badges">
            {history.reverse().map((item, index) => (
              <span key={index} className="history-badge">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// CSS Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
  
  body {
    font-family: 'Comic Neue', cursive;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .counter-app {
    text-align: center;
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 320px;
    border: 3px solid #ff8a65;
    position: relative;
    overflow: hidden;
  }

  .counter-app::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    z-index: -1;
    filter: blur(20px);
    opacity: 0.6;
  }

  h1 {
    color: #ff7043;
    margin-bottom: 1rem;
    font-size: 2.2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .emoji-display {
    font-size: 5rem;
    margin: 0.5rem 0;
    transition: all 0.3s ease;
  }

  .emoji-display.bounce {
    animation: bounce 0.5s;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .counter-display {
    font-size: 3.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: linear-gradient(to right, #a1c4fd, #c2e9fb);
    border-radius: 10px;
    color: #2c3e50;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
  }

  .counter-display.negative {
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
    color: #c0392b;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin: 1.5rem 0;
  }

  .btn {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }

  .btn:active {
    transform: translateY(1px);
  }

  .btn-increment {
    background: linear-gradient(to right, #56ab2f, #a8e063);
    color: white;
  }

  .btn-decrement {
    background: linear-gradient(to right, #ff512f, #dd2476);
    color: white;
  }

  .btn-reset {
    background: linear-gradient(to right, #4776e6, #8e54e9);
    color: white;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .btn-random {
    background: linear-gradient(to right, #ffb347, #ffcc33);
    color: white;
  }

  .counter-message {
    height: 24px;
    margin: 1rem 0;
    font-size: 1.1rem;
    color: #ff7043;
    font-weight: bold;
  }

  .history {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 2px dashed #ffab91;
  }

  .history p {
    margin-bottom: 0.5rem;
    color: #ff7043;
  }

  .history-badges {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .history-badge {
    background: #ffccbc;
    color: #bf360c;
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
    font-size: 0.9rem;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
