import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"
import Btn from "../Btn/Btn"

const Navbar = () => {
  return (
    <nav className={styles.navTop}>
      <Link to={"/"}>All</Link>
      <Link to={"/todos/archive"}>Completed</Link>
      <Link to={"/todos/new"} className={styles.navBtn}>
        <Btn onClick={() => console.log("nav button clicked")}>New task</Btn>
      </Link>
    </nav>
  )
}

export default Navbar
