import CategoryForm from '../../components/CategoryForm/CategoryForm';
import { CategoryFormData } from '../../components/CategoryForm/schema';
import PageWrapper from '../../components/PageWrapper/PageWrapper'
import Title from '../../components/Title/Title'
import { createCategory } from '../../services/categories-services';

const CreateCategoryPage = () => {
  const handleCategorySubmit = async (data: CategoryFormData) => {
    try {
      const newCategory = await createCategory(data);
      return newCategory;
    } catch (e: any) {
      throw new Error(e.message)
    }
  };

  return (
    <PageWrapper>
      <Title>Add category</Title>
        <CategoryForm onSubmit={handleCategorySubmit} formType='CREATE' />
    </PageWrapper>
  )
}

export default CreateCategoryPage
