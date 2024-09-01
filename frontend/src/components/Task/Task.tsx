import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services"
import styles from "./Task.module.scss"

interface TaskProps {
  task: TaskResponse;
  onArchive: (id: number) => Promise<unknown>
}

const Task = ({ task, onArchive }: TaskProps) => {
  return (
    <div className={styles.taskWrapper}>
      <div className={styles.taskContainer}>
        <button
          onClick={() => onArchive(task.id)}
          className={styles.btnDone}>
        </button>

        <div className={styles.taskDetails}>
          <h4>{task.name}</h4>
          <p className={styles.categoryTag}>{task.category.name}</p>
        </div>

        <Link to={`todos/${task.id}/edit`} className={styles.btnMain}>
            Edit
        </Link>
      </div>

      <button className={styles.btnSecondary}>
        Duplicate
      </button>
    </div>
  )
}

export default Task
