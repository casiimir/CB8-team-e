import styles from "./index.module.scss";

import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

import Button from "../button";

const Modal = ({
  status = "Errore",
  title = "ERRORE!",
  text,
  textButton = "OK",
  buttonHandleSumbit,
}) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Inner}>
        <h1>
          {status === "Errore" ? (
            <ImCross />
          ) : (
            status === "Successo" && <FaCheck />
          )}
        </h1>
        <div className={styles.message}>
          <h3>{title}</h3>
          <p>{text}</p>
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
