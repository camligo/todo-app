import { useForm } from "react-hook-form"
import { schema, TaskFormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import classes from "./TaskForm.module.scss"
import CategorySelect from "../CategorySelect/CategorySelect.tsx";

type FormType = 'CREATE' | 'UPDATE';

interface TaskFormProps {
  formType?: FormType;
  onSubmit: (data: TaskFormData) => unknown;
}

const TaskForm = ({
  formType = 'CREATE',
  onSubmit,
}: TaskFormProps) => {
  const {
    reset,
    register,
    setValue,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });

  isSubmitSuccessful && reset;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        
        <div className={classes.field}>
          <label htmlFor="name">Task</label>
          <input id="name" type="text" {...register('name')} />
          {errors?.name && <small>{errors.name.message}</small>}
        </div>

        <div>
          <CategorySelect
            value={null} // intial value
            onChange={(value) => {
              console.log("Category Selected: ", value);
              if(value !== null) {
                setValue('categoryId', value, { shouldValidate: true });
              }
            }}
            error={errors?.categoryId?.message}
          />

        </div>

        <button>{formType === 'CREATE' ? 'Create' : 'Update'} Task</button>
      </form>
    </>
  )
}

export default TaskForm
