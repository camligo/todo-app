import { useEffect, useState } from "react"
import { archivateTaskById, deleteTaskById, getAllTasks, TaskResponse } from "../../services/task-services"
import Task from "../../components/Task/Task"
import CreateCategoryPage from "../CreateCategoryPage/CreateCategoryPage"
import Navbar from "../../components/Navbar/Navbar"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  // const deleteTask = async (id: number) => {
  //   const confirmed = confirm("Are you sure you want to delete this task?");
  //   if(!confirmed) {
  //     return;
  //   }
  //   const isDeleted = await deleteTaskById(id).catch((e) => {
  //     console.log(e);
  //     return false;
  //   });
  //   if(isDeleted) {
  //     const updatedTasks = tasks.filter(task => task.id !== id);
  //     setTasks(updatedTasks);
  //   }
  // }

  const archiveTask = async (id: number) => {
    const confirmed = confirm("Move this task to the archive?");
    if(!confirmed) {
      return;
    }
    const isArchived = await archivateTaskById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if(isArchived) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks)
    }
  }

  return (
    <>
      <Navbar />
      <h1>Todo App</h1>
      <CreateCategoryPage />
      {tasks.map((task) => (
        <Task task={task} onArchive={archiveTask} key={task.id}/>
      ))}
    </>
  )
}

export default TodosPage
