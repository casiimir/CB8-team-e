import styles from "./index.module.scss";

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  FaHouse,
  FaTicket,
  FaMagnifyingGlass,
  FaCircleUser,
  FaSquarePlus,
  FaTableList,
} from "react-icons/fa6";

import { RiLoginBoxFill } from "react-icons/ri";

const NavBar = ({ userType }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

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
            {userType === "business" ? (
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
            {userType === "business" ? (
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
              className={
                router.pathname === `/user/${userId}` ? styles.Active : ""
              }
              href={`/user/${userId}`}
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
