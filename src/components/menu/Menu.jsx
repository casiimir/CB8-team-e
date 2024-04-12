import styles from "./index.module.scss";

import Link from "next/link";

const Menu = () => {
  return (
    <nav>
      <ul className={styles.Menu}>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/search">
          <li>Cerca evento</li>
        </Link>
        <Link href="/add">
          <li>aggiungi evento</li>
        </Link>
        <Link href="/myTickets">
          <li>Le mie prenotazioni</li>
        </Link>
        <Link href="/myEvents">
          <li>I miei eventi</li>
        </Link>
        <Link href="/profile">
          <li>Profilo</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Menu;
