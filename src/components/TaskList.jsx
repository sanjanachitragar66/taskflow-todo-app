import EmptyState from "./EmptyState.jsx";
import TaskItem from "./TaskItem.jsx";

function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  emptyTitle,
  isLoading,
  loadError,
  isMutating,
}) {
  if (isLoading) {
    return (
      <p className="task-loading" role="status" aria-live="polite">
        Loading your tasks...
      </p>
    );
  }

  if (loadError) return null;

  if (tasks.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          disabled={isMutating}
        />
      ))}
    </ul>
  );
}

export default TaskList;
