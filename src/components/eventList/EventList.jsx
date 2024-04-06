import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const EventsList = ({ selectedTab }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/events/search?category=${selectedTab}`)
      .then((res) => res.json())
      .then((events) => setEvents(events.data));
    console.log(events);
  }, [selectedTab]);

  return (
    <div>
      <h3 className={styles.Title3}>{selectedTab}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 &&
          events.map((event) => (
            <div key={event._id} className={styles.Event}>
              <img src={`events/${event.poster}`} alt={event.title} />
              <div className={styles.EventInfo}>
                <h4>{event.title}</h4>
                <p>Data: {event.date}</p>
                <button>
                  <a href={`/api/events/${event._id}`}>Visualizza Evento</a>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventsList;
