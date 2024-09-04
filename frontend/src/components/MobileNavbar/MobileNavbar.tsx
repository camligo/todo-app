import { Link } from "react-router-dom";
import styles from "./MobileNavbar.module.scss";
import Btn from "../Btn/Btn";
import { FaHome, FaCalendar } from "react-icons/fa";

const MobileNavbar = () => {
  return (
    <nav className={styles.mobileNavbar}>
      <Link to={"/"} className={styles.navHome}>
        <FaHome className={styles.icon} />
      </Link>
      <Link to={"/todos/new"} className={styles.addTask}>
        <Btn variant="round">+</Btn>
      </Link>
      <Link to={"/todos/archive"}>
        <FaCalendar className={styles.icon} />
      </Link>
    </nav>
  );
};

export default MobileNavbar;
