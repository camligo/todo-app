import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"

const Navbar = () => {
  return (
    <nav className={styles.navTop}>
      <Link to={"/"}>Home</Link>
      <Link to={"/todos/archive"}>Archive</Link>
      <Link to={"/todos/new"} className={styles.btnMain}>
        New task
      </Link>
    </nav>
  )
}

export default Navbar
