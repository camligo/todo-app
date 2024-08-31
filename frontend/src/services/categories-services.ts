import { TaskResponse } from "./task-services";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export interface CategoryResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: TaskResponse[];
}

export const getAllCategories = async () => {
  const response = await fetch(baseUrl + '/categories');

  if(!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  return await response.json() as CategoryResponse[];
}

export const createCategory = async ( data: { name: string }) => {
  const response = await fetch(baseUrl + '/categories', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if(!response.ok) {
    throw new Error("Failed to create category");
  }
  return (await response.json()) as CategoryResponse;
}

export const deleteCategoryById = async (id: number) => {
  const response = await fetch(baseUrl + `/categories/${id}`, {
    method: 'DELETE',
  });
  if(!response.ok) {
    throw new Error("Failed to delete category with id " + id)
  }
}
