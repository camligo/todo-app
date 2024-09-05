import { useNavigate } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import { createTask } from "../../services/task-services";
import TaskForm from "../../components/TaskForm/TaskForm";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import styles from "./CreateTaskPage.module.scss";
import Title from "../../components/Title/Title";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleTaskSubmit = async (data: TaskFormData) => {
    createTask(data)
    .then(() => navigate('/'))
    .catch((e) => console.log(e)); // todo - display error to user
  };

  return (
    <PageWrapper>
      <Title>New task</Title>
      <div className={styles.formContainer}>
        <TaskForm onSubmit={handleTaskSubmit} formType='CREATE' />
      </div>
    </PageWrapper>
  )
}

export default CreateTaskPage
