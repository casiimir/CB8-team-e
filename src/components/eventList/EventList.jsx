import styles from "./index.module.scss";
import EventCard from "../eventCard";
import Loader from "../loader";
const EventsList = ({ title, events, endPoint }) => {
  return (
    <div>
      <h3 className={styles.SelectedCatName}>{title.toUpperCase()}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 ? (
          events.map((event, key) => (
            <EventCard key={key} event={event} endPoint={endPoint} />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default EventsList;
