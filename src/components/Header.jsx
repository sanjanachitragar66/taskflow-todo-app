function Header({ searchTerm, onSearchChange, onAddTask, userLabel, onLogout }) {
  return (
    <header className="topbar">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <span className="visually-hidden">Search tasks</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search your tasks..."
        />
      </label>
      <div className="topbar-actions">
        <button
          className="primary-button add-task-button"
          type="button"
          onClick={onAddTask}
        >
          <span aria-hidden="true">＋</span> Add task
        </button>
        <div className="account-actions">
          <span className="account-label" title={userLabel}>
            {userLabel}
          </span>
          <button className="logout-button" type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
