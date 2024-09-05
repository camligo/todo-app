import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import styles from "./CategoryForm.module.scss";
import Btn from "../Btn/Btn";
import { useState } from "react";
import { createCategory } from "../../services/categories-services";
import { useNavigate } from "react-router-dom";
import FormStyle from "../FormStyle/FormStyle";

type FormType = 'CREATE';

interface CategoryFormProps {
  formType?: FormType;
  onSubmit: (data: CategoryFormData) => unknown;
}
const CategoryForm = ({ formType = 'CREATE', onSubmit }: CategoryFormProps) => {
  const navigate = useNavigate();

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
      const newCategory = await createCategory(data);
      if (newCategory) {
        reset();
        onSubmit(data);
        navigate('/todos/new');
      }
    } catch (e: any) {
      setError(e.message);
    }
  }

  const handleCancel = () => {
    navigate('/todos/new')
  }

  return (
    <>
      <FormStyle onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="name">New category</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          {...register('name')}
          className={styles.formInput}
        />
        {errors?.name && <small className={styles.errorText}>{errors.name.message}</small>}
        {error && <small className={styles.errorText}>{error}</small>}
        <div className={styles.btnContainer}>
          <Btn variant="secondary" onClick={handleCancel}>
            Cancel
          </Btn>
          <Btn>
            Add
          </Btn>
        </div>
      </FormStyle>
    </>
  )
}

export default CategoryForm
