import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import EventCard from "../eventCard";

const EventsList = ({ title, events }) => {
  return (
    <div>
      <h3 className={styles.Title3}>{title}</h3>
      <div className={styles.EventContainer}>
        {events?.length > 0 &&
          events.map((event) => <EventCard event={event} />)}
      </div>
    </div>
  );
};

export default EventsList;
