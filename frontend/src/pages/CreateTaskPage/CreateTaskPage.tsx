import { useNavigate } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import { createTask } from "../../services/task-services";
import TaskForm from "../../components/TaskForm/TaskForm";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: TaskFormData) => {
    createTask(data)
    .then(() => navigate('/'))
    .catch((e) => console.log(e)); // todo - display error on page
  };

  return (
    <>
      <h1>Create a new task</h1>
      <TaskForm onSubmit={onSubmit} formType='CREATE' />
    </>
  )
}

export default CreateTaskPage
