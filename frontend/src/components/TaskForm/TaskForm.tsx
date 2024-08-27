import { useForm } from "react-hook-form"
import { schema, TaskFormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import classes from "./TaskFrom.module.scss"

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => unknown
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const {
    reset,
    register,
    formState: {errors, isSubmitSuccessful},
    handleSubmit} = useForm<TaskFormData>({resolver: zodResolver(schema)})

    isSubmitSuccessful && reset();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

      <div className={classes.field}>
        <label htmlFor="name">Task</label>
        <input type="text" {...register('name')} />
        {errors?.name && <small className={classes.errorText}>{errors.name.message}</small>}
      </div>

      <div className={classes.field}>
        <label htmlFor="categoryId">Category</label>
        <input type="number" {...register('categoryId')} />
        {errors?.categoryId && <small className={classes.errorText}>{errors.categoryId.message}</small>}
      </div>

      <button>Add task</button>
    </form>
  )
}

export default TaskForm
