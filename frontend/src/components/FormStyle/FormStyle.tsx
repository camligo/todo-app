import styles from "./FormStyle.module.scss"

interface FormStyleProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormStyle: React.FC<FormStyleProps> = ({ children, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      { children }
    </form>
  )
}

export default FormStyle
