import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import FilterControls from "./FilterControls";
import useLocalStorage from "../../hooks/useLocalStorage";

import './TodoApp.css'

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

 
  const [tasks, setTasks] = useLocalStorage("todos", []);


  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority,
      },
    ]);
    setTask("");
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

 
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };


  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1 className='heading'> React Todo App</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
        />

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      <FilterControls filter={filter} setFilter={setFilter} />

      <ul>
        {filteredTasks.map((t) => (
          <TodoItem
            key={t.id}
            task={t}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
