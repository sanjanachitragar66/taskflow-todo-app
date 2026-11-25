import { supabase } from "../supabase.js";

function getClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Check your environment variables.");
  }
  return supabase;
}

function requireUserId(userId) {
  if (typeof userId !== "string" || !userId.trim()) {
    throw new Error("You must be signed in to access tasks.");
  }
  return userId;
}

function toTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    category: row.category ?? "Personal",
    dueDate: row.due_date ?? "",
    priority: row.priority ?? "Medium",
    completed: Boolean(row.is_completed),
  };
}

function toDatabaseTask(details) {
  return {
    title: details.title,
    description: details.description ?? "",
    category: details.category,
    due_date: details.dueDate || null,
    priority: details.priority || "Medium",
    is_completed: Boolean(details.completed),
  };
}

export async function fetchTasks(userId) {
  const ownerId = requireUserId(userId);
  const { data, error } = await getClient()
    .from("tasks")
    .select("*")
    .eq("user_id", ownerId);

  if (error) throw error;
  return (data ?? []).map(toTask);
}

export async function createTask(details, userId) {
  const ownerId = requireUserId(userId);
  const { data, error } = await getClient()
    .from("tasks")
    .insert({
      ...toDatabaseTask(details),
      user_id: ownerId,
    })
    .select()
    .single();

  if (error) throw error;
  return toTask(data);
}

export async function updateTaskDetails(taskId, details, userId) {
  const ownerId = requireUserId(userId);
  const { data, error } = await getClient()
    .from("tasks")
    .update(toDatabaseTask(details))
    .eq("id", taskId)
    .eq("user_id", ownerId)
    .select()
    .single();

  if (error) throw error;
  return toTask(data);
}

export async function setTaskCompletion(taskId, completed, userId) {
  const ownerId = requireUserId(userId);
  const { data, error } = await getClient()
    .from("tasks")
    .update({ is_completed: completed })
    .eq("id", taskId)
    .eq("user_id", ownerId)
    .select()
    .single();

  if (error) throw error;
  return toTask(data);
}

export async function removeTask(taskId, userId) {
  const ownerId = requireUserId(userId);
  const { data, error } = await getClient()
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", ownerId)
    .select("id");

  if (error) throw error;
  if (!data?.length) {
    throw new Error("Task was not found or you do not have permission to delete it.");
  }
}
