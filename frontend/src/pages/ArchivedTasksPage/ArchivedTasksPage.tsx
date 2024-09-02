import { useEffect, useState } from "react";
import { deleteTaskById, getAllArchivedTasks, TaskResponse, toggleArchiveTaskById } from "../../services/task-services";
import ArchivedTask from "../../components/ArchivedTask/ArchivedTask";
import styles from "./ArchivedTasksPage.module.scss"

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

  const unArchiveTask = async (id: number) => {
    const confirmed = confirm("Move this task to Todo-list?");
    if(!confirmed) {
      return;
    }
    const isUnArchived = await toggleArchiveTaskById(id, false).catch((e) => {
      console.log(e);
      return false;
    });
    if(isUnArchived) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    }
  }

  return (
    <>
      <section className={styles.pageWrapper}>
        <h2>Completed tasks</h2>
        {tasks.map((task) => (
          <ArchivedTask task={task} key={task.id} onDelete={deleteTask} onUnArchive={unArchiveTask}/>
        ))}
      </section>
    </>
  )
}

export default ArchivedTasksPage
