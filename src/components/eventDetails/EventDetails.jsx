import styles from "./index.module.scss";
import {
  FaCalendar,
  FaClock,
  FaTicket,
  FaLocationDot,
  FaShop,
} from "react-icons/fa6";

const EventDetails = ({ event }) => {
  return (
    <div className={styles.Details}>
      <h2>{event.title}</h2>

      <div className={styles.DateAndTime}>
        <div className={styles.Info}>
          <FaCalendar /> {event.date}
        </div>
        <div className={styles.Info}>
          <FaClock /> {event.time}
        </div>
      </div>

      <div className={styles.Info}>
        <FaLocationDot /> {event.city}
      </div>

      <div className={styles.Location}>
        <FaShop />
        <p>{event.place}</p>
      </div>

      <div className={styles.Description}>
        <p>{event.description}</p>
      </div>

      <div className={styles.Capacity}>
        <FaTicket />
        <p>
          {event.capacity > 0
            ? `${event.capacity} posti rimanenti`
            : "Evento Sold Out!"}
        </p>
      </div>

      <h3>{event.organizer}</h3>
    </div>
  );
};

export default EventDetails;
