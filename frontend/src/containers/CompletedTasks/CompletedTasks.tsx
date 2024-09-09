import { useEffect } from "react";
import { getAllArchivedTasks, TaskResponse, toggleArchiveTaskById } from "../../services/task-services";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import styles from "./CompletedTasks.module.scss";

interface CompletedTasksProps {
  archivedTasks: TaskResponse[];
  setArchivedTasks: (tasks: TaskResponse[]) => void;
}

const CompletedTasks = ({ archivedTasks, setArchivedTasks }: CompletedTasksProps ) => {
  useEffect(() => {
    getAllArchivedTasks()
      .then(data => setArchivedTasks(data))
      .catch((e) => console.log(e));
  }, [])

  const unArchiveTask = async (id: number) => {
    const confirmed = confirm("Move this task to Todo-list?");
    if(!confirmed) {
      return;
    }
    const isUnArchived = await toggleArchiveTaskById(id, false).catch((e) => {
      console.log(e);
      return false;
    });
    if (isUnArchived) {
      const updatedArchivedTasks = archivedTasks.filter(task => task.id !== id);
      setArchivedTasks(updatedArchivedTasks);
    }
  }

  return (
    <>
      <div className={styles.subHeadingContainer}>
        <h4 className={styles.subHeading}>
          Completed tasks
        </h4>
      </div>
      <div className={styles.tasksContainer}>
        {archivedTasks.map((task) => (
          <CompletedTask task={task} key={task.id} onUnArchive={unArchiveTask}/>
        ))}
      </div>
    </>
  )
}

export default CompletedTasks
