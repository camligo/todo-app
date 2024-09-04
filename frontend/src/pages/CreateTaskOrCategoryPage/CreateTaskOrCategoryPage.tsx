import { useNavigate } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import { createTask } from "../../services/task-services";
import TaskForm from "../../components/TaskForm/TaskForm";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { CategoryFormData } from "../../components/CategoryForm/schema";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import styles from "./CreateTaskOrCategoryPage.module.scss";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleTaskSubmit = async (data: TaskFormData) => {
    createTask(data)
    .then(() => navigate('/'))
    .catch((e) => console.log(e)); // todo - display error to user
  };

  const handleCategorySubmit = async (data: CategoryFormData) => {
    try {
      const newCategory = await data;
      return newCategory;
    } catch (e: any) {
      throw new Error(e.message)
    }
  };

  return (
    <PageWrapper>
      <h1>Create new task</h1>
      <div className={styles.formContainer}>
        <div>
          <TaskForm onSubmit={handleTaskSubmit} formType='CREATE' />
        </div>
        <div>
          <CategoryForm onSubmit={handleCategorySubmit} formType='CREATE' />
        </div>
      </div>
    </PageWrapper>
  )
}

export default CreateTaskPage
