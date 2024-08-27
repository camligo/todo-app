import { TaskFormData } from "../components/TaskForm/schema";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface TaskResponse {
  id: number,
  name: string,
  category: {
    id: number,
    name: string,
  },
  archived: boolean,
}

export const getAllTasks = async () => {
  const response = await fetch(baseUrl + '/todos');

  if(!response.ok) {
    throw new Error('Failed to fetch');
  }
  return await response.json() as TaskResponse[];
}

export const deleteTaskById = async (id: number) => {
  const response = await fetch(baseUrl + `/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return true;
}

export const createTask = async (data: TaskFormData) => {
  const response = await fetch(baseUrl + '/tasks', {
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
