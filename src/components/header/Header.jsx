import styles from "./index.module.scss";

import Menu from "../menu";

const Header = () => {
  return (
    <header className={styles.Header}>
      <img src="/logo-moveeda.gif" alt="logo moveeda" className={styles.Logo} />
      <Menu />
    </header>
  );
};

export default Header;
