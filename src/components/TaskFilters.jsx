const FILTERS = ["All", "Pending", "Completed"];

function TaskFilters({ activeFilter, onChange }) {
  return (
    <div className="task-filters" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={activeFilter === filter ? "active" : ""}
          type="button"
          aria-pressed={activeFilter === filter}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
