import { TaskResponse } from "../../services/task-services"
import Btn from "../Btn/Btn";
import styles from "./ArchivedTask.module.scss"

interface TaskProps {
  task: TaskResponse;
  onDelete: (id: number) => Promise<unknown>;
  onUnArchive: (id: number) => Promise<unknown>;
}

const ArchivedTask = ({ task, onDelete, onUnArchive }: TaskProps) => {
  return (
    <article className={styles.taskContainer}>
      <div className={styles.taskDetails}>
        <h4>{task.name}</h4>
        <p className={styles.categoryTag}>
          {task.category.name}
        </p>
      </div>
      <Btn onClick={() => onDelete(task.id)}>
        Delete
      </Btn>
      <Btn
        variant="secondary"
        onClick={() => onUnArchive(task.id)}
      >
        Move to Todo
      </Btn>
    </article>
  )
}

export default ArchivedTask
