import { TaskResponse } from "../../services/task-services"

interface TaskProps {
  task: TaskResponse;
  onDelete: (id: number) => Promise<unknown>;
  onUnArchive: (id: number) => Promise<unknown>;
}

const ArchivedTask = ({ task, onDelete, onUnArchive }: TaskProps) => {
  return (
    <div>
      <h2>To do: {task.name}</h2>
      <h2>Category: {task.category.name}</h2>
      <button onClick={() => onDelete(task.id)}>
          Delete
      </button>
      <button onClick={() => onUnArchive(task.id)}>
        Unarchive
      </button>
    </div>
  )
}

export default ArchivedTask
