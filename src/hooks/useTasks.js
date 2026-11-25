import { useEffect, useState } from "react";
import {
  createTask,
  fetchTasks,
  removeTask,
  setTaskCompletion,
  updateTaskDetails,
} from "../services/taskService.js";

function useTasks(userId) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [operationError, setOperationError] = useState("");

  function clearOperationError() {
    setOperationError("");
  }

  useEffect(() => {
    let isCurrentUser = true;

    async function loadCurrentUserTasks() {
      if (!userId) {
        setTasks([]);
        setLoadError("");
        setIsLoading(false);
        return;
      }

      setTasks([]);
      setIsLoading(true);
      setLoadError("");
      try {
        const loadedTasks = await fetchTasks(userId);
        if (isCurrentUser) setTasks(loadedTasks);
      } catch (error) {
        if (isCurrentUser) setLoadError(getErrorMessage(error));
      } finally {
        if (isCurrentUser) setIsLoading(false);
      }
    }

    loadCurrentUserTasks();
    return () => {
      isCurrentUser = false;
    };
  }, [userId]);

  async function performTaskOperation(operation) {
    setIsMutating(true);
    setOperationError("");
    try {
      await operation();
      return true;
    } catch (error) {
      setOperationError(getErrorMessage(error));
      return false;
    } finally {
      setIsMutating(false);
    }
  }

  async function loadTasks() {
    if (!userId) return;

    setIsLoading(true);
    setLoadError("");
    try {
      setTasks(await fetchTasks(userId));
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  function addTask(taskDetails) {
    return performTaskOperation(async () => {
      const task = await createTask(taskDetails, userId);
      setTasks((currentTasks) => [...currentTasks, task]);
    });
  }

  function updateTask(taskId, updates) {
    return performTaskOperation(async () => {
      const task = await updateTaskDetails(taskId, updates, userId);
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === taskId ? task : currentTask,
        ),
      );
    });
  }

  function toggleTask(taskId) {
    const task = tasks.find((currentTask) => currentTask.id === taskId);
    if (!task) return Promise.resolve(false);

    return performTaskOperation(async () => {
      const updatedTask = await setTaskCompletion(
        taskId,
        !task.completed,
        userId,
      );
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === taskId ? updatedTask : currentTask,
        ),
      );
    });
  }

  function deleteTask(taskId) {
    return performTaskOperation(async () => {
      await removeTask(taskId, userId);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
    });
  }

  return {
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
  };
}

function getErrorMessage(error) {
  return error instanceof Error
    ? error.message
    : "Unable to complete the task request. Please try again.";
}

export default useTasks;
