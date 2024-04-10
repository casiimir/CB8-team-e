import styles from "./index.module.scss";

const EventCard = ({ event, endPoint = "event" }) => {
  return (
    <div key={event._id} className={styles.Event}>
      <img
        src={
          event.poster.includes("http")
            ? event.poster
            : `events/${event.poster}`
        }
        alt={event.title}
      />
      <div className={styles.EventInfo}>
        <h4>{event.title}</h4>
        <p>Data: {event.date}</p>
        <button>
          <a
            href={`${endPoint}/${event.ticketId ? event.ticketId : event._id}`}
          >
            Visualizza Evento
          </a>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
