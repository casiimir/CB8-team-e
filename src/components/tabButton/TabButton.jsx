import styles from "./index.module.scss";

const TabButton = ({ children, onSelect }) => {
  return (
    <li className={styles.TabItems}>
      <button className={styles.TabBtn} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
};

export default TabButton;
