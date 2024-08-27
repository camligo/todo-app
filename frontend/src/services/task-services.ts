const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const getAllTasks = async () => {
  const response = await fetch(baseUrl + '/todos');

  if(!response.ok) {
    throw new Error('Failed to fetch');
  }
  return await response.json();
}
