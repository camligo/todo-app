import { FormProvider, useForm } from "react-hook-form"
import { schema, TaskFormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./TaskForm.module.scss"
import CategorySelect from "../CategorySelect/CategorySelect.tsx";
import Btn from "../Btn/Btn.tsx";
import { Link } from "react-router-dom";
import FormStyle from "../FormStyle/FormStyle.tsx";

type FormType = 'CREATE' | 'UPDATE';

interface TaskFormProps {
  formType?: FormType;
  onSubmit: (data: TaskFormData) => unknown;
  defaultValues?: any;
}

export const getDate = (date?: Date): string => {
  let dateToFormat = new Date();
  if (date) {
    dateToFormat = new Date(date);
  }
  const year = dateToFormat.getFullYear();
  const month = (dateToFormat.getMonth() + 1).toString().padStart(2, "0");
  const day = dateToFormat.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TaskForm = ({
  formType = "CREATE",
  onSubmit,
  defaultValues = { name: "", categoryId: "", dueDate: getDate() },
}: TaskFormProps) => {
  const methods = useForm<TaskFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = methods;

  isSubmitSuccessful && reset();

  return (
    <>
      <FormProvider {...methods}>
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label htmlFor="name">Task</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter task"
              className={styles.formInput}
            />
            {errors?.name && (
              <small className={styles.errorText}>
                {errors.name.message}
              </small>
            )}
        </div>

        <div className={styles.field}>
            <div className={styles.flexRow}>
              <label htmlFor="category">Category</label>
              <Link to={"/categories"}>Create new category</Link>
            </div>
            <CategorySelect
              error={errors?.categoryId?.message}
              defVal={defaultValues.categoryId}
            />
        </div>

        <div className={styles.flexRow}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="priority"
              {...register("priority")}
            />
            <label htmlFor="priority">
              <small>Priority</small>
            </label>
          </div>

            <div className={styles.field}>
              <label htmlFor="dueDate">Due date</label>
              <input
                id="name"
                type="date"
                {...register("dueDate")}
                className={styles.formInput}
              />
              {errors?.dueDate && (
                <small className={styles.errorText}>
                  {errors.dueDate.message}
                </small>
              )}
            </div>
          </div>

          <Btn variant="primary">
            {formType === "CREATE" ? "Create" : "Update"}
          </Btn>
        </FormStyle>
      </FormProvider>
    </>
  );
};

export default TaskForm;
