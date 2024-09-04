import { useEffect, useState } from "react"
import { getAllTasksOrderedByPriority, TaskResponse, toggleArchiveTaskById } from "../../services/task-services"
import Task from "../../components/Task/Task"
import styles from "./TodosPage.module.scss"
import PageWrapper from "../../components/PageWrapper/PageWrapper"
import Title from "../../components/Title/Title"
import EmptyTasksView from "../../components/EmptyTasksView/EmptyTasksView"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllTasksOrderedByPriority()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  const archiveTask = async (id: number) => {
    const isArchived = await toggleArchiveTaskById(id, true)
      .catch((e) => {
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
      {tasks.length === 0 ? (
        <EmptyTasksView />
      ) : (
        <>
          <Title>To-do list</Title>
          <div className={styles.tasksContainer}>
            {tasks.map((task) => (
              <Task task={task} onArchive={archiveTask} key={task.id}/>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  )
}

export default TodosPage
