import { useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Statistics from "../components/Statistics.jsx";
import TaskFilters from "../components/TaskFilters.jsx";
import TaskInput from "../components/TaskInput.jsx";
import TaskList from "../components/TaskList.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useTaskContext } from "../context/TaskContext.jsx";
import { getTodayKey, formatToday } from "../utils/dateUtils.js";
import { filterTasks } from "../utils/taskUtils.js";

const CATEGORIES = ["Personal", "Work", "Study"];

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeView, setActiveView] = useState("All Tasks");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { user, signOut, authError } = useAuth();
  const {
    tasks,
    isLoading,
    isMutating,
    loadError,
    operationError,
    loadTasks,
    clearOperationError,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTaskContext();

  const todayKey = getTodayKey();
  const viewTasks = tasks.filter((task) => {
    if (activeView === "Today") return task.dueDate === todayKey;
    if (activeView === "Upcoming") return task.dueDate > todayKey;
    if (activeView === "Completed") return task.completed;
    return true;
  });
  const categoryTasks =
    selectedCategory === "All"
      ? viewTasks
      : viewTasks.filter((task) => task.category === selectedCategory);
  const statusTasks = filterTasks(categoryTasks, activeFilter);
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleTasks = statusTasks.filter((task) =>
    [task.title, task.description, task.category, task.priority]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch),
  );
  const completed = tasks.filter((task) => task.completed).length;
  const pageTitle =
    activeView === "All Tasks" ? "Your tasks, in one clear view." : activeView;
  const userLabel =
    user?.user_metadata?.full_name?.trim() || user?.email || "Your account";

  function openNewTaskForm() {
    clearOperationError();
    setEditingTask(null);
    setIsTaskFormOpen(true);
  }

  function closeTaskForm() {
    setEditingTask(null);
    setIsTaskFormOpen(false);
  }

  async function handleSaveTask(details) {
    let saved;
    if (editingTask) {
      saved = await updateTask(editingTask.id, details);
    } else {
      saved = await addTask(details);
    }
    if (saved) closeTaskForm();
    return saved;
  }

  function handleSelectCategory(category) {
    setSelectedCategory(category);
    setActiveView("All Tasks");
  }

  return (
    <div className="app-shell">
      <Sidebar
        categories={CATEGORIES}
        activeView={activeView}
        selectedCategory={selectedCategory}
        onSelectView={setActiveView}
        onSelectCategory={handleSelectCategory}
        tasks={tasks}
      />
      <main className="app-main">
        <div className="dashboard-content">
          <Header
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddTask={openNewTaskForm}
            userLabel={userLabel}
            onLogout={signOut}
          />
          <section className="page-heading">
            <div>
              <span className="today-label">{formatToday()}</span>
              <h1>{pageTitle}</h1>
              <p>A little progress today makes a big difference tomorrow.</p>
            </div>
            <span className="heading-decoration" aria-hidden="true">
              ✦
            </span>
          </section>

          {loadError && (
            <div className="task-error" role="alert">
              <span>Tasks could not be loaded: {loadError}</span>
              <button type="button" onClick={loadTasks} disabled={isLoading}>
                {isLoading ? "Loading..." : "Try again"}
              </button>
            </div>
          )}
          {operationError && !isTaskFormOpen && (
            <p className="task-error" role="alert">
              Task update failed: {operationError}
            </p>
          )}
          {authError && (
            <p className="storage-message auth-storage-message" role="alert">
              {authError}
            </p>
          )}

          <Statistics
            total={tasks.length}
            completed={completed}
            pending={tasks.length - completed}
          />

          <section className="task-panel" aria-labelledby="task-list-heading">
            <div className="task-panel-heading">
              <div>
                <h2 id="task-list-heading">
                  {selectedCategory === "All" ? activeView : selectedCategory}
                </h2>
                <span>
                  {visibleTasks.length}{" "}
                  {visibleTasks.length === 1 ? "task" : "tasks"}
                </span>
              </div>
              <TaskFilters
                activeFilter={activeFilter}
                onChange={setActiveFilter}
              />
            </div>
            <TaskList
              tasks={visibleTasks}
              onToggleTask={toggleTask}
              onEditTask={(task) => {
                clearOperationError();
                setEditingTask(task);
                setIsTaskFormOpen(true);
              }}
              onDeleteTask={deleteTask}
              isLoading={isLoading}
              loadError={loadError}
              isMutating={isMutating}
              emptyTitle={
                tasks.length === 0
                  ? "Your task list is ready"
                  : "No tasks match this view"
              }
            />
          </section>
        </div>
      </main>
      {isTaskFormOpen && (
        <TaskInput
          categories={CATEGORIES}
          editingTask={editingTask}
          onSave={handleSaveTask}
          onCancel={closeTaskForm}
          isSaving={isMutating}
          operationError={operationError}
        />
      )}
    </div>
  );
}

export default Dashboard;
