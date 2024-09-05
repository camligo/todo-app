import { TaskResponse } from "../../services/task-services"
import styles from "./ArchivedTask.module.scss"

interface TaskProps {
  task: TaskResponse;
  onDelete: (id: number) => Promise<unknown>;
  onUnArchive: (id: number) => Promise<unknown>;
}

const ArchivedTask = ({ task, onDelete, onUnArchive }: TaskProps) => {
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
        {/* <Btn onClick={() => onDelete(task.id)}>
          Delete
        </Btn> */}
        {/* <Btn
          variant="secondary"
          onClick={() => onUnArchive(task.id)}
        >
          Move to Todo
        </Btn> */}
      </article>

    </div>
  )
}

export default ArchivedTask
