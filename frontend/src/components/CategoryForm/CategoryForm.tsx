import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import styles from "./CategoryForm.module.scss";
import Btn from "../Btn/Btn";

type FormType = 'CREATE';

interface CategoryFormProps {
  formType?: FormType;
  onSubmit: (data: CategoryFormData) => unknown;
}
const CategoryForm = ({ formType = 'CREATE', onSubmit }: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  isSubmitSuccessful && reset();

  return (
    <>
      <h2>Create new category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter a name"
          {...register('name')}
          className={styles.formInput}
        />
        {errors?.name && <small>{errors.name.message}</small>}
        <Btn variant="secondary">Add</Btn>
      </form>
    </>
  )
}

export default CategoryForm
