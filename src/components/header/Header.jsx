import styles from "./index.module.scss";

const Header = () => {
  return (
    <nav className={styles.Header}>
      <img src="/moveeda-logo.jpg" alt="logo moveeda" className={styles.Logo} />
      <img
        src="/user.png"
        alt="immagine profilo"
        className={styles.ProfileImg}
      />
    </nav>
  );
};

export default Header;
