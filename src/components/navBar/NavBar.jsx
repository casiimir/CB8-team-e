import styles from "./index.module.scss";
import {
  FaHouse,
  FaTicket,
  FaMagnifyingGlass,
  FaCircleUser,
} from "react-icons/fa6";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavMenu}>
        <li>
          <FaHouse />
        </li>
        <li>
          <FaMagnifyingGlass />
        </li>
        <li>
          <FaTicket />
        </li>
        <li>
          <FaCircleUser />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
