import CategoryForm from "../../components/CategoryForm/CategoryForm"
import { CategoryFormData } from "../../components/CategoryForm/schema";
import { createCategory } from "../../services/categories-services";

const CreateCategoryPage = () => {
  const onSubmit = async (data: CategoryFormData) => {
    try {
      createCategory(data)
      // .then(() => navigate('/'))
    } catch (e) {
      console.log(e);
    }
    // .catch((e) =>  // todo - display error on page
  };

  return (
    <div>
      <CategoryForm
        onSubmit={onSubmit}
        formType='CREATE'
      />
    </div>
  )
}

export default CreateCategoryPage
