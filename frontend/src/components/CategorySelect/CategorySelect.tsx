import { useEffect, useState } from "react"
import { CategoryResponse, getAllCategories } from "../../services/categories-services"
import styles from "./CategorySelect.module.scss"
import { useFormContext } from "react-hook-form";

interface CategorySelectProps {
  value?: number | null;
  onChange?: (value: number | null) => unknown;
  error?: string;
  defVal: string;
}

const CategorySelect = ({ error, defVal }: CategorySelectProps) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const {
      register,
      setValue,
      formState: { isSubmitSuccessful },
  } = useFormContext();

  useEffect(() => {
      getAllCategories()
          .then((data) => setCategories(data))
          .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
      console.log(isSubmitSuccessful);
      if (categories.length > 0) {
          setValue("categoryId", defVal);
      }
  }, [categories, setValue]);

  return (
      <>
          <select className={styles.selectMenu} {...register("categoryId")}>
              <option value="">Select</option>
              {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                      {category.name}
                  </option>
              ))}
          </select>
          {error && <small>{error}</small>}
      </>
  );
};

export default CategorySelect;
