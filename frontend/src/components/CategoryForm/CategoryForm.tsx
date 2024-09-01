import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import classes from "./CategoryForm.module.scss";

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
      <h2>Add a new category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formCreate}>
          <input
            type="text"
            placeholder=" Enter new category" {...register('name')}
            className={classes.formInput}
          />
          {errors?.name && <small>{errors.name.message}</small>}
        <button className={classes.btnMain}>Add</button>
        </div>
      </form>
    </>
  )
}

export default CategoryForm
