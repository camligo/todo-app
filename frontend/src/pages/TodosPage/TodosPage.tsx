import { useEffect, useState } from "react"
import { getAllTasks, TaskResponse, toggleArchiveTaskById } from "../../services/task-services"
import Task from "../../components/Task/Task"
import styles from "./TodosPage.module.scss"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {

    getAllTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  const archiveTask = async (id: number) => {
    const confirmed = confirm("Move this task to the archive?");
    if(!confirmed) {
      return;
    }
    const isArchived = await toggleArchiveTaskById(id, true).catch((e) => {
      console.log(e);
      return false;
    });
    if(isArchived) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks)
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <h1>Todo List</h1>
      <div className={styles.contentWrapper}>
        <div className={styles.tasksContainer}>
          <h2>Tasks</h2>
          {tasks.map((task) => (
            <Task task={task} onArchive={archiveTask} key={task.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodosPage
