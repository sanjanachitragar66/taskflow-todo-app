export function filterTasks(tasks, filter) {
  if (filter === "Pending") return tasks.filter((task) => !task.completed);
  if (filter === "Completed") return tasks.filter((task) => task.completed);
  return tasks;
}
