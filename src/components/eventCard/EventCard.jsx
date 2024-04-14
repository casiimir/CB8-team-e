import { useRouter } from "next/router";
import Button from "../button";
import styles from "./index.module.scss";
import {
  FaCalendar,
  FaClock,
  FaTicket,
  FaLocationDot,
  FaShop,
} from "react-icons/fa6";

const EventCard = ({ event, endPoint = "event" }) => {
  const router = useRouter();

  return (
    <div key={event._id} className={styles.Event}>
      <div className={styles.PosterContainer}>
        <img
          src={
            event?.poster.includes("http")
              ? event.poster
              : `events/${event.poster}`
          }
          alt={event.title}
        />
      </div>
      <div className={styles.EventInfo}>
        <p> < FaCalendar /> {event.date} </p>
           <h3>{event.title}</h3>
      <div className={styles.LocationDate}>
      <p> < FaLocationDot /> {event.city} </p> 
     </div>
     
        <h6>{event.capacity != 0 ? `${event.capacity} posti disponibili`: "SOLD OUT"}</h6>

 
        <Button
        className={styles.Button}
          textButton="Visualizza evento"
          onClick={() =>
            router.push(
              `${endPoint}/${event.ticketId ? event.ticketId : event._id}`
            )
          }
        />
    </div>
    </div>
  );
};

export default EventCard;
