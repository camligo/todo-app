import { useEffect, useState } from "react"
import { CategoryResponse, getAllCategories } from "../../services/categories-services"
import styles from "./CategorySelect.module.scss"

interface CategorySelectProps {
  value: number | null;
  onChange: (value: number | null) => unknown;
  error?: string;
}

const CategorySelect = ({ value, onChange, error }: CategorySelectProps) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([])

  useEffect(() => {
    getAllCategories()
      .then(data => setCategories(data))
      .catch((e) => console.log(e))
  }, [])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value === "" ? null : parseInt(event.target.value, 10);
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
  }

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={handleSelectChange}
        className={styles.selectMenu}
      >
        <option value="" disabled selected>
          Select
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <small>{error}</small>}
    </>
  )
}

export default CategorySelect
