import { useNavigate } from "react-router-dom";
import { TaskFormData } from "../../components/TaskForm/schema";
import { createTask } from "../../services/task-services";
import TaskForm from "../../components/TaskForm/TaskForm";
import CategoryForm from "../../components/CategoryForm/CategoryForm";
import { CategoryFormData } from "../../components/CategoryForm/schema";
import { createCategory } from "../../services/categories-services";

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const handleTaskSubmit = async (data: TaskFormData) => {
    createTask(data)
    .then(() => navigate('/'))
    .catch((e) => console.log(e)); // todo - display error on page
  };

  const handleCategorySubmit = async (data: CategoryFormData) => {
    try {
      createCategory(data)
      // .then(() => navigate('/'))
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Create new task</h1>
      <div>
        <TaskForm onSubmit={handleTaskSubmit} formType='CREATE' />
      </div>
      <div>
        <CategoryForm onSubmit={handleCategorySubmit} formType='CREATE' />
      </div>
    </>
  )
}

export default CreateTaskPage
