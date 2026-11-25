import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks.js";

const TaskContext = createContext(null);

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used inside a TaskProvider.");
  }
  return context;
}

function TaskProvider({ children, userId }) {
  const taskState = useTasks(userId);

  return (
    <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>
  );
}

export default TaskProvider;
