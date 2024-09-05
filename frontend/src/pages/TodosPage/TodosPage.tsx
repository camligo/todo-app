import { useEffect, useState } from "react"
import { getAllTasksOrderedByPriority, TaskResponse, toggleArchiveTaskById } from "../../services/task-services"
import Task from "../../components/Task/Task"
import styles from "./TodosPage.module.scss"
import PageWrapper from "../../components/PageWrapper/PageWrapper"
import Title from "../../components/Title/Title"
import EmptyTasksView from "../../components/EmptyTasksView/EmptyTasksView"
import CompletedTasks from "../../containers/CompletedTasks/CompletedTasks"

const TodosPage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [archivedTasks, setArchivedTasks] = useState<TaskResponse[]>([]);

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

    if (isArchived) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      const archivedTask = tasks.find(task => task.id === id);

      if (archivedTask) {
        setArchivedTasks([...archivedTasks, { ...archivedTask, archived: true}]);
      }
      setTasks(updatedTasks);
    }
  }

  const showEmptyTasksView = tasks.length === 0 && archivedTasks.length === 0;

  return (
    <PageWrapper>
      <>
        {showEmptyTasksView ? (
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
      </>
      <>
        {archivedTasks && (
          <CompletedTasks archivedTasks={archivedTasks} setArchivedTasks={setArchivedTasks}/>
        )}
      </>
    </PageWrapper>
  )
}


export default TodosPage
