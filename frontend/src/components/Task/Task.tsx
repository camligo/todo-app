import { TaskResponse } from "../../services/task-services"

interface TaskProps {
  task: TaskResponse
  onDelete: (id: number) => Promise<unknown>
}

const Task = ({ task, onDelete }: TaskProps) => {
  return (
    <div>
      <h2>To do: {task.name}</h2>
      <h2>Category: {task.category.name}</h2>
      <button
        onClick={() => onDelete(task.id)}>
          Delete
      </button>
    </div>
  )
}

export default Task
