import { TaskFormData } from "../components/TaskForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface TaskResponse {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  },
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export const createTask = async (data: TaskFormData) => {
  const response = await fetch(baseUrl + 'todos', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if(!response.ok) {
    throw new Error('Failed to create new task');
  }
  return (await response.json()) as TaskResponse;
}

export const getAllTasks = async () => {
  const response = await fetch(baseUrl + 'todos');

  if(!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const tasks = await response.json() as TaskResponse[];
  return tasks.filter(task => !task.archived);
}

export const getAllArchivedTasks = async () => {
  const response = await fetch(baseUrl + 'todos/archive');

  if(!response.ok) {
    throw new Error('Failed to fetch archived tasks');
  }
  return await response.json() as TaskResponse[];
}

export const getTaskById = async (id: number) => {
  const response = await fetch(baseUrl + `todos/${id}`);

  if(!response.ok) {
    throw new Error('Failed to fetch task with id ' + id)
  }

  return (await response.json()) as TaskResponse;
}

export const updateTaskById = async (id: number, data: TaskFormData) => {
  const response = await fetch(baseUrl + `todos/${id}/edit`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if(!response.ok) {
    throw new Error("Failed to update task with id " + id)
  }
  return (await response.json()) as TaskResponse;
}

export const deleteTaskById = async (id: number) => {
  const response = await fetch(baseUrl + `todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("Failed to delete task with id " + id);
  }
  return true;
}

export const toggleArchiveTaskById = async (id: number, archive: boolean) => {
  const response = await fetch(baseUrl + `todos/${id}/archive?archive=${archive}`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(`Failed to ${archive ? "archive " : "unarchive "} task`);
  }
  return true;
};

// export const unArchiveTaskById = async (id: number) => {
//   const response = await fetch(baseUrl + `todos/${id}/archive`, {
//     method: 'PATCH',
//   });

//   if(!response.ok) {
//     throw new Error("Failed to move task to Todo-list")
//   }
//   return true;
