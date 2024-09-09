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
      <article className={styles.taskContainer}>
        <button
          onClick={() => onArchive(task.id)}
          className={styles.btnDone}>
        </button>

        <div className={styles.taskDetails}>
          <Link to={`todos/${task.id}/edit`}>
            <p className={styles.taskTitle}>{task.name}</p>
          </Link>
          <small>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</small>
        </div>
        <small className={styles.categoryTag}>{task.category.name}</small>
      </article>
    </div>
  )
}

export default Task
