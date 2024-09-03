import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import styles from "./CategoryForm.module.scss";
import Btn from "../Btn/Btn";
import { useState } from "react";

type FormType = 'CREATE';

interface CategoryFormProps {
  formType?: FormType;
  onSubmit: (data: CategoryFormData) => unknown;
}
const CategoryForm = ({ formType = 'CREATE', onSubmit }: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormSubmit = async (data: CategoryFormData) => {
    setError(null);
    setSuccess(null);

    try {
      const newCategory = await onSubmit(data);
      if (newCategory) {
        setSuccess(`${newCategory.name} added!`);
        reset();
      }
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <>
      <h2>Create new category</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <input
          type="text"
          placeholder="Enter a name"
          {...register('name')}
          className={styles.formInput}
        />
        {errors?.name && <small className={styles.errorText}>{errors.name.message}</small>}
        {error && <small className={styles.errorText}>{error}</small>}
        {success && <small className={styles.successText}>{success}</small>}
        <Btn variant="secondary">Add</Btn>
      </form>
    </>
  )
}

export default CategoryForm
