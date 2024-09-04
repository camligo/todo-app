import { useForm } from "react-hook-form"
import { schema, TaskFormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./TaskForm.module.scss"
import CategorySelect from "../CategorySelect/CategorySelect.tsx";
import Btn from "../Btn/Btn.tsx";
import { FaCalendarDay } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  isSubmitSuccessful && reset();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Task</label>
          <input
            id="name"
            type="text" {...register('name')}
            placeholder="Enter task"
            className={styles.formInput}
          />
          {errors?.name &&
            <small className={styles.errorText}>
              {errors.name.message}
            </small>
          }
        </div>

        <div className={styles.field}>
          <div className={styles.flexRow}>
            <label htmlFor="category">Category</label>
            <Link to={"/categories"}>Create new category</Link>
          </div>
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

        <div className={styles.flexRow}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="priority" name="priority"/>
            <label htmlFor="priority">
              <small>Priority</small>
            </label>
          </div>
          <div className={styles.icon}>
            <FaCalendarDay />
          </div>
        </div>

        <Btn variant="primary" onClick={() => console.log("button clicked")}>
          {formType === 'CREATE' ? 'Create' : 'Update'}
        </Btn>
      </form>
    </>
  )
}

export default TaskForm
