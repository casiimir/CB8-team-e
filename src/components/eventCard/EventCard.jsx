import { useRouter } from "next/router";
import Button from "../button";
import styles from "./index.module.scss";

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
        <h4>{event.title}</h4>
        <p>Data: {event.date}</p>
        <Button
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
