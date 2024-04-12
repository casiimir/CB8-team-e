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
  FaDoorOpen,
} from "react-icons/fa6";

import { RiLoginBoxFill } from "react-icons/ri";

const NavBar = ({ userType }) => {
  const router = useRouter();

  console.log(userType);

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
        {userType !== undefined ? (
          <>
            {userType === "organizer" ? (
              <li>
                <Link href="/add">
                  <FaSquarePlus />
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <Link
                className={
                  router.pathname === "/myTickets" ? styles.Active : ""
                }
                href="/myTickets"
              >
                <FaTicket />
              </Link>
            </li>
            {userType === "organizer" ? (
              <li>
                <Link href="/myEvents">
                  <FaTableList />
                </Link>
              </li>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <li>
          {userType ? (
            <Link
              className={router.pathname === "/profile" ? styles.Active : ""}
              href="/profile"
            >
              <FaCircleUser />
            </Link>
          ) : (
            <Link
              className={router.pathname === "/login" ? styles.Active : ""}
              href="/login"
            >
              <RiLoginBoxFill />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
