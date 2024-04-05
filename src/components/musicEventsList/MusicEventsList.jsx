import styles from "./index.module.scss";
import musicEvents from "../../musicEvent.js";

const EventsList = () => {
  return (
    <div>
      <h3 className={styles.Title3}>Popolari</h3>
      <div className={styles.EventContainer}>
        {musicEvents.map((event) => (
          <div key={event.id} className={styles.Event}>
            <img src={event.image} alt={event.title} />
            <div className={styles.EventInfo}>
              <h4>{event.title}</h4>
              <p>Data: {event.date}</p>
              <button>Visualizza evento</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
