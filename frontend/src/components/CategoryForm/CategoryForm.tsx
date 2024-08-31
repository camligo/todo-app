import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";

type FormType = 'CREATE' | 'UPDATE';

interface CategoryFormProps {
  formType?: FormType;
  onSubmit: (data: CategoryFormData) => unknown;
}
const CategoryForm = ({
  formType = 'CREATE',
  onSubmit
}: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  isSubmitSuccessful && reset;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Enter new category" {...register('name')}/>
          {errors?.name && <small>{errors.name.message}</small>}
        </div>
        <button>{formType === 'CREATE' ? 'Add' : 'Update'}</button>
      </form>
    </>
  )
}

export default CategoryForm
