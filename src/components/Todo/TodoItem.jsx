const TodoItem = ({ task, onDelete, onToggle }) => {
  return (
    <li className={`${task.completed ? "done" : ""} ${task.priority}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span>{task.text}</span>

      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
};

export default TodoItem;
