import Title from "../Title/Title"
import styles from "./EmptyTasksView.module.scss"
import todoImg from "../../assets/illustration.png"

const EmptyTasksView = () => {
  return (
    <>
      <Title>To-do app</Title>
      <div className={styles.subheadingContainer}>
        <h3 className={styles.subheading}>
          Looks like you don't have anything to do yet...
        </h3>
      </div>
      <img src={todoImg} alt="To-do illustration" />
      <div className={styles.subheadingContainer}>
        <h3 className={styles.subheading}>
          Press the button to add your first task!
        </h3>
      </div>
    </>
  )
}

export default EmptyTasksView
