import { useState, useEffect } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>

      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">No tasks found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
            </div>
          ))
        )}
      </div>

      {todos.some((todo) => todo.completed) && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}

      <div className="todo-stats">
        <span>{todos.filter((todo) => !todo.completed).length} tasks left</span>
      </div>
    </div>
  );
}

export default TodoApp;

// CSS Styles
const styles = `
  :root {
    --primary: #4a6bff;
    --primary-light: #e0e6ff;
    --dark: #2c3e50;
    --light: #f8f9fa;
    --gray: #6c757d;
    --border: #e0e0e0;
    --danger: #ff4757;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7ff;
    padding: 20px;
  }

  .todo-app {
    width: 100%;
    max-width: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 24px;
  }

  h1 {
    color: var(--dark);
    margin-bottom: 20px;
    text-align: center;
    font-size: 28px;
  }

  .todo-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .todo-input input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border 0.3s;
  }

  .todo-input input:focus {
    border-color: var(--primary);
  }

  .todo-input button {
    padding: 12px 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;
  }

  .todo-input button:hover {
    background: #3a5bef;
  }

  .todo-filters {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
  }

  .todo-filters button {
    flex: 1;
    padding: 8px;
    background: none;
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .todo-filters button.active {
    background: var(--primary-light);
    color: var(--primary);
    border-color: var(--primary-light);
    font-weight: 600;
  }

  .todo-list {
    margin-bottom: 20px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }

  .todo-item:hover {
    background: #f9f9f9;
  }

  .todo-item.completed span {
    text-decoration: line-through;
    color: var(--gray);
  }

  .todo-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .todo-item span {
    flex: 1;
    font-size: 16px;
  }

  .todo-item button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--gray);
    font-size: 18px;
    transition: color 0.2s;
  }

  .todo-item button:hover {
    color: var(--danger);
  }

  .empty-message {
    text-align: center;
    color: var(--gray);
    padding: 20px;
  }

  .clear-completed {
    width: 100%;
    padding: 10px;
    background: var(--danger);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 20px;
    font-weight: 600;
    transition: background 0.3s;
  }

  .clear-completed:hover {
    background: #e84141;
  }

  .todo-stats {
    text-align: center;
    color: var(--gray);
    font-size: 14px;
  }

  /* Responsive adjustments */
  @media (max-width: 600px) {
    .todo-app {
      padding: 16px;
    }

    .todo-input {
      flex-direction: column;
    }

    .todo-input button {
      width: 100%;
    }
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
