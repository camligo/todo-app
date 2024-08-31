import { Link } from "react-router-dom";
import { TaskResponse } from "../../services/task-services"

interface TaskProps {
  task: TaskResponse;
  // onDelete: (id: number) => Promise<unknown>;
  onArchive: (id: number) => Promise<unknown>
}

const Task = ({ task, onArchive }: TaskProps) => {
  return (
    <div>
      <h2>To do: {task.name}</h2>
      <h2>Category: {task.category.name}</h2>
      {/* <button
        onClick={() => onDelete(task.id)}>
          Delete
      </button> */}
      <button onClick={() => onArchive(task.id)}>
        Archive
      </button>
      <button>
        Duplicate
      </button>
      <Link to={`todos/${task.id}/edit`}>
        <button>
        Edit
        </button>
      </Link>
    </div>
  )
}

export default Task
