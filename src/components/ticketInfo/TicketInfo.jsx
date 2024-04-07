import styles from "./index.module.scss";
import { FaCalendar, FaClock, FaLocationDot } from "react-icons/fa6";

const TicketInfo = ({ ticket }) => {
  return (
    <div className={styles.TicketInfo}>
      <div className={styles.Info}>
        <h3 className={styles.Title}>{ticket.title}</h3>
        <div className={styles.DateTime}>
          <div className={styles.InfoIcon}>
            <h5>
              <FaCalendar /> Data
            </h5>
            <p>{ticket.date}</p>
          </div>
          <div className={styles.InfoIcon}>
            <h5>
              <FaClock /> Orario
            </h5>
            <p>{ticket.time}</p>
          </div>
        </div>
        <div className={styles.InfoIcon}>
          <h5>
            <FaLocationDot /> Location
          </h5>
          <p>
            {ticket.place}, {ticket.city}
          </p>
        </div>
      </div>
      <div className={styles.TicketDiv}>
        <hr className={styles.TicketHr} />
      </div>
      <div className={styles.TicketCode}>
        <h3>{ticket.ticketId}</h3>
      </div>
    </div>
  );
};

export default TicketInfo;
