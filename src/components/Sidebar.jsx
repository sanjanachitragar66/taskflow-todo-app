import CategoryList from "./CategoryList.jsx";
import { getTodayKey } from "../utils/dateUtils.js";

const NAV_ITEMS = [
  { name: "All Tasks", icon: "▦" },
  { name: "Today", icon: "◷" },
  { name: "Upcoming", icon: "▣" },
  { name: "Completed", icon: "✓" },
];

function Sidebar({
  categories,
  activeView,
  selectedCategory,
  onSelectView,
  onSelectCategory,
  tasks,
}) {
  const counts = {
    "All Tasks": tasks.length,
    Today: tasks.filter((task) => task.dueDate === getTodayKey()).length,
    Upcoming: tasks.filter((task) => task.dueDate > getTodayKey()).length,
    Completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <aside className="app-sidebar">
      <a className="brand" href="/" aria-label="TaskFlow dashboard">
        <span className="brand-mark" aria-hidden="true">
          ✓
        </span>
        <span>TaskFlow</span>
      </a>
      <span className="sidebar-kicker">WORKSPACE</span>
      <nav className="sidebar-navigation" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.name}
            className={activeView === item.name ? "selected" : ""}
            type="button"
            aria-current={activeView === item.name ? "page" : undefined}
            onClick={() => onSelectView(item.name)}
          >
            <span className="nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.name}</span>
            <span className="nav-count">{counts[item.name]}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-section-heading">
        <span className="sidebar-kicker">CATEGORIES</span>
      </div>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <div className="sidebar-footer">
        <span className="footer-sparkle" aria-hidden="true">
          ✦
        </span>
        <p>Small steps add up.</p>
        <span>Keep going at your own pace.</span>
      </div>
    </aside>
  );
}

export default Sidebar;
