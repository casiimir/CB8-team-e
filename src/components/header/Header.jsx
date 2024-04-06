import styles from "./index.module.scss";

const Header = () => {
  return (
    <nav className={styles.Header}>
      <img src="/logo-moveeda.gif" alt="logo moveeda" className={styles.Logo} />
    </nav>
  );
};

export default Header;
