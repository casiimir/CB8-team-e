import styles from "./index.module.scss";
import Link from "next/link";
import {
  FaHouse,
  FaTicket,
  FaMagnifyingGlass,
  FaCircleUser,
  FaSquarePlus,
  FaTableList,
} from "react-icons/fa6";

const NavBar = () => {
  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavMenu}>
        <li>
          <Link href="/">
            <FaHouse />
          </Link>
        </li>
        <li>
          <Link href="/cerca-evento">
            <FaMagnifyingGlass />
          </Link>
        </li>
        <li>
          <FaSquarePlus />
        </li>
        <li>
          <FaTicket />
        </li>
        <li>
          <FaTableList />
        </li>
        <li>
          <Link href="/login">
            <FaCircleUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
