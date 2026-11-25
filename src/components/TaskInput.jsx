import { useEffect, useState } from "react";

const PRIORITIES = ["Low", "Medium", "High"];

function TaskInput({
  categories,
  editingTask,
  onSave,
  onCancel,
  isSaving,
  operationError,
}) {
  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [description, setDescription] = useState(
    editingTask?.description ?? "",
  );
  const [category, setCategory] = useState(
    editingTask?.category ?? categories[0] ?? "Personal",
  );
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ?? "");
  const [priority, setPriority] = useState(editingTask?.priority ?? "Medium");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Please enter a task title.");
      return;
    }

    await onSave({
      title: trimmedTitle,
      description: description.trim(),
      category,
      dueDate,
      priority,
    });
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className="task-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-dialog-title"
      >
        <div className="dialog-heading">
          <div>
            <span className="dialog-kicker">
              {editingTask ? "MAKE AN UPDATE" : "MAKE IT HAPPEN"}
            </span>
            <h2 id="task-dialog-title">
              {editingTask ? "Edit task" : "Add a new task"}
            </h2>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={onCancel}
            aria-label="Close task form"
          >
            ×
          </button>
        </div>
        <form className="task-form" onSubmit={handleSubmit}>
          {operationError && (
            <p className="task-form-error" role="alert">
              {operationError}
            </p>
          )}
          <label htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (error) setError("");
            }}
            placeholder="e.g. Prepare project presentation"
            maxLength={120}
            autoFocus
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "task-title-error" : undefined}
          />
          {error && (
            <span className="form-error" id="task-title-error" role="alert">
              {error}
            </span>
          )}

          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a few details (optional)"
            rows="3"
            maxLength={500}
          />

          <div className="form-field-row">
            <div className="form-field">
              <label htmlFor="task-category">Category</label>
              <select
                id="task-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="task-date">Due date</label>
              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>

          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="dialog-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              type="submit"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : editingTask
                  ? "Save changes"
                  : "Save task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskInput;
