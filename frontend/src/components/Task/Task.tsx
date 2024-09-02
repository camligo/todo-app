import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services"
import styles from "./Task.module.scss"
import Btn from "../Btn/Btn";

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
          <h4>{task.name}</h4>
          <p className={styles.categoryTag}>{task.category.name}</p>
        </div>

        <Link to={`todos/${task.id}/edit`}>
            <Btn>Edit</Btn>
        </Link>
        <Btn variant="secondary">
          Duplicate
        </Btn>
      </article>
    </div>
  )
}

export default Task
