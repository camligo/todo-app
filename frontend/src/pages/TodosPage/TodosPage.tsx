import { useEffect, useState } from "react"
import { deleteTaskById, getAllTasks, TaskResponse } from "../../services/task-services"
import Task from "../../components/Task/Task"
import CreateCategoryPage from "../CreateCategoryPage/CreateCategoryPage"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  console.log(tasks);

  const deleteTask = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if(!confirmed) {
      return;
    }
    const isDeleted = await deleteTaskById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if(isDeleted) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <h1>Todo App</h1>
      <CreateCategoryPage />
      {tasks.map((task) => (
        <Task task={task} onDelete={deleteTask} key={task.id}/>
      ))}
    </>
  )
}

export default TodosPage
