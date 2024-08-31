import { useEffect, useState } from "react";
import { deleteTaskById, getAllArchivedTasks, TaskResponse } from "../../services/task-services";
import ArchivedTask from "../../components/ArchivedTask/ArchivedTask";

const ArchivedTasksPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllArchivedTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

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
      <h2>Archived Tasks</h2>
      {tasks.map((task) => (
        <ArchivedTask task={task} key={task.id} onDelete={deleteTask}/>
      ))}
    </>
  )
}

export default ArchivedTasksPage
