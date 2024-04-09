import styles from "./index.module.scss";
import Button from "../button";
import { ImCross } from "react-icons/im";

const Modal = ({
  status = (
    <icon>
      <ImCross />
    </icon>
  ),
  text = "ERRORE!",
  textButton = "OK",
  buttonHandleSumbit,
}) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Inner}>
        <h1>{status}</h1>
        <div className={styles.message}>
          <h3>{text}</h3>
        </div>
        <Button
          textButton={textButton}
          onClick={buttonHandleSumbit}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Modal;
