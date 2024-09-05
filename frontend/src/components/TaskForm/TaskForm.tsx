import { useForm } from "react-hook-form"
import { schema, TaskFormData } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./TaskForm.module.scss"
import CategorySelect from "../CategorySelect/CategorySelect.tsx";
import Btn from "../Btn/Btn.tsx";
import { FaCalendarDay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Modal from "../Modal/Modal.tsx";
import { useState } from "react";
import FormStyle from "../FormStyle/FormStyle.tsx";

type FormType = 'CREATE' | 'UPDATE';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TaskFormProps {
  formType?: FormType;
  onSubmit: (data: TaskFormData) => unknown;
  defaultValues?: any;
}

const TaskForm = ({ formType = 'CREATE', onSubmit, defaultValues }: TaskFormProps) => {
  const navigate = useNavigate();

  const {
    reset,
    register,
    setValue,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
  } = useForm<TaskFormData>({ resolver: zodResolver(schema), defaultValues });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Value>(new Date());

  const locale = 'en-AU';

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value) || value === null) return;

    setDate(value);
    setValue("dueDate", value);
    setIsModalOpen(false);
  }

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    navigate('/todos/new')
  }

  isSubmitSuccessful && reset();

  return (
    <>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label htmlFor="name">Task</label>
          <input
            id="name"
            type="text"
            {...register('name')}
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
            value={null}
            onChange={(value) => {
              if(value !== null) {
                setValue('categoryId', value, { shouldValidate: true });
              }
            }}
            error={errors?.categoryId?.message}
          />
        </div>

        <div className={styles.flexRow}>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="priority"
              {...register('priority')}
            />
            <label htmlFor="priority">
              <small>Priority</small>
            </label>
          </div>
          <button
            className={styles.icon}
            onClick={handleOpenModal}
          >
            <FaCalendarDay />
          </button>
        </div>
        <div>
          {date && (
            <small className={styles.selectedDate}>
              Due on {date.toLocaleString(locale, {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit"
              })}
            </small>
          )}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Calendar
              onChange={handleDateChange}
              value={date || new Date()}
            />
        </Modal>

        {/* {formType === 'UPDATE' && (
          <Link to={`/todos/${task.id}`} className={styles.linkDelete}>
            Delete task?
          </Link>
        )} */}

        {formType === 'UPDATE' && (
          <div className={styles.btnContainer}>
            <Btn variant="secondary" onClick={handleCancel}>
              Cancel
            </Btn>
            <Btn variant="primary">
              Update
            </Btn>
          </div>
        )}

        {formType === 'CREATE' && (
          <Btn variant="primary">
            Add
          </Btn>
        )}
      </FormStyle>
    </>
  )
}

export default TaskForm
