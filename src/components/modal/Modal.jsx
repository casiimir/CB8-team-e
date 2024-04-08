import styles from "./index.module.scss";
import Button from "../button";

const Modal = ({ stateText, text, textButton, handleSumbit }) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Inner}>
        <h2>{stateText}</h2>
        <div className={styles.message}>
          <p>{text}</p>
        </div>
        <Button textButton={textButton} onClick={handleSumbit} type="submit" />
      </div>
    </div>
  );
};

export default Modal;
