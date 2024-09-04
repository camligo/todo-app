import { useEffect, useState } from "react"
import { getAllTasks, TaskResponse, toggleArchiveTaskById } from "../../services/task-services"
import Task from "../../components/Task/Task"
import styles from "./TodosPage.module.scss"
import PageWrapper from "../../components/PageWrapper/PageWrapper"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  const archiveTask = async (id: number) => {
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
    <PageWrapper>
      <h1>To-do list</h1>
      <div className={styles.tasksContainer}>
        {tasks.map((task) => (
          <Task task={task} onArchive={archiveTask} key={task.id}/>
        ))}
      </div>
    </PageWrapper>
  )
}

export default TodosPage
