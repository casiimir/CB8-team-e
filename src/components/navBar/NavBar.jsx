import styles from "./index.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  FaHouse,
  FaTicket,
  FaMagnifyingGlass,
  FaCircleUser,
  FaSquarePlus,
  FaTableList,
} from "react-icons/fa6";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className={styles.NavBar}>
      <ul className={styles.NavMenu}>
        <li>
          <Link
            className={router.pathname === "/" ? styles.Active : ""}
            href="/"
          >
            <FaHouse />
          </Link>
        </li>
        <li>
          <Link
            className={router.pathname === "/search" ? styles.Active : ""}
            href="/search"
          >
            <FaMagnifyingGlass />
          </Link>
        </li>
        <li>
          <Link href="/add">
            <FaSquarePlus />
          </Link>
        </li>
        <li>
          <Link
            className={router.pathname === "/myTickets" ? styles.Active : ""}
            href="/myTickets"
          >
            <FaTicket />
          </Link>
        </li>
        <li>
          <FaTableList />
        </li>
        <li>
          <Link
            className={router.pathname === "/login" ? styles.Active : ""}
            href="/login"
          >
            <FaCircleUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
