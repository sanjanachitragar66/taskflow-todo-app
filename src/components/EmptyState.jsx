function EmptyState({ title = "No tasks here yet" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">
        ✦
      </span>
      <h3>{title}</h3>
      <p>Add a task or adjust your filters to see something here.</p>
    </div>
  );
}

export default EmptyState;
