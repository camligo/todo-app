import styles from "./Title.module.scss";

interface TitleProps {
  children: string;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 className={styles.title}>
      {children}
    </h1>
  )
}

export default Title
