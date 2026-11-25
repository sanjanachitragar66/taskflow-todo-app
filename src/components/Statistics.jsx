function Statistics({ total, completed, pending }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="statistics" aria-label="Task statistics">
      <div className="stat-card">
        <span className="stat-label">Total tasks</span>
        <strong>{total}</strong>
      </div>
      <div className="stat-card">
        <span className="stat-label">Pending tasks</span>
        <strong>{pending}</strong>
      </div>
      <div className="stat-card">
        <span className="stat-label">Completed tasks</span>
        <strong>{completed}</strong>
      </div>
      <div className="progress-card">
        <div className="progress-copy">
          <span className="stat-label">Progress</span>
          <strong>{progress}%</strong>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}

export default Statistics;
