import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import EventCard from "../eventCard";

const EventsList = ({ title, events, endPoint }) => {
  return (
    <div>
      <h3 className={styles.Title3}>{title}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 &&
          events.map((event) => (
            <EventCard event={event} endPoint={endPoint} />
          ))}
      </div>
    </div>
  );
};

export default EventsList;
