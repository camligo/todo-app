import { useEffect, useState } from "react";
import { getTaskById, TaskResponse, updateTaskById } from "../../services/task-services";
import { useNavigate, useParams } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import TaskForm, { getDate } from "../../components/TaskForm/TaskForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Title from "../../components/Title/Title";

type Status = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';

const EditTaskPage = () => {
  const [status, setStatus] = useState<Status>('IDLE');
  const [error, setError] = useState<Error | null>(null);
  const [task, setTask] = useState<TaskResponse | null>(null);
  const { id } = useParams() as { id: string };
  const idNumber = parseInt(id);
  const navigate = useNavigate();


  useEffect(() => {
    setStatus('LOADING');
    getTaskById(idNumber)
      .then((task) => {
        setStatus('SUCCESS');
        setTask(task);
      })
      .catch((e: Error) => {
        setStatus('FAILURE');
        setError(e);
      })
  }, []);

  const formSubmit = (data: TaskFormData) => {
    updateTaskById(idNumber, data)
      .then(() => navigate('/'))
      .catch(() => alert('Failed to update task'));
  };
  return (
    <PageWrapper>
      <Title>Edit task</Title>
      {status === 'LOADING' && <p>Loading...</p>}
      {status === 'FAILURE' && (
        <p>{error?.message}</p>
      )}
      {status === 'SUCCESS' && task && (
        <TaskForm
          onSubmit={formSubmit}
          formType='UPDATE'
          defaultValues={{name: task.name, categoryId: task.category.id, dueDate: getDate(task.dueDate)}}
          id={idNumber}
        />
      )}
    </PageWrapper>
  )
}

export default EditTaskPage
