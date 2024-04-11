import styles from "./index.module.scss";
import EventCard from "../eventCard";

const EventsList = ({ title, events, endPoint }) => {
  return (
    <div>
      <h3 className={styles.SelectedCatName}>{title}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 &&
          events.map((event, key) => (
            <EventCard key={key} event={event} endPoint={endPoint} />
          ))}
      </div>
    </div>
  );
};

export default EventsList;
