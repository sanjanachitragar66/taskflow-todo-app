import { formatDueDate } from "../utils/dateUtils.js";

function TaskItem({ task, onToggle, onEdit, onDelete, disabled }) {
  return (
    <li className={`task-item${task.completed ? " is-completed" : ""}`}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        disabled={disabled}
        aria-label={`${task.completed ? "Reopen" : "Complete"} ${task.title}`}
      />
      <div className="task-details">
        <span className="task-title">{task.title}</span>
        {task.description && (
          <span className="task-description">{task.description}</span>
        )}
        <span className="task-meta">
          <span className={`category-tag ${getCategoryClass(task.category)}`}>
            {task.category}
          </span>
          <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
            <span aria-hidden="true">●</span> {task.priority}
          </span>
          {task.dueDate && (
            <span className="task-due-date">
              <span aria-hidden="true">◷</span> {formatDueDate(task.dueDate)}
            </span>
          )}
        </span>
      </div>
      <div className="task-actions">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </button>
        <button
          className="delete-action"
          type="button"
          disabled={disabled}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function getCategoryClass(category) {
  return `category-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export default TaskItem;
