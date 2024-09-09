import { TaskResponse } from "../../services/task-services"
import styles from "./ArchivedTask.module.scss"

interface TaskProps {
  task: TaskResponse;
  onUnArchive: (id: number) => Promise<unknown>;
}

const ArchivedTask = ({ task, onUnArchive }: TaskProps) => {
  return (
    <div className={styles.taskWrapper}>
      <article className={styles.taskContainer}>
        <button
          onClick={() => onUnArchive(task.id)}
          className={styles.btnDone}>
        </button>
        <div className={styles.taskDetails}>
          <p>{task.name}</p>
        </div>
      </article>
    </div>
  )
}

export default ArchivedTask
