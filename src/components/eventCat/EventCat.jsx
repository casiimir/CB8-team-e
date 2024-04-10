import styles from "./index.module.scss";
import EventList from "../eventList";

import { useState, useEffect } from "react";

const EventCat = () => {
  const [categoriesData, setCategoriesData] = useState([{}]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => setCategoriesData(categories.data));
  }, []);

  const onHandleCategory = (categoryName) => {
    fetch(`/api/events/search?category=${categoryName}`)
      .then((res) => res.json())
      .then((events) => setEvents(events.data));
  };

  return (
    <div className={styles.EventCatContainer}>
      {categoriesData.map((categoria, key) => (
        <div
          className={styles.EventCardCat}
          key={categoria.key}
          onClick={() => onHandleCategory(categoria.name)}
        >
          <div className={styles.Overlay}>
            <h4>{categoria.name}</h4>
          </div>
          <img
            src={`categories/${categoria.background}`}
            alt={categoria.name}
          />
        </div>
      ))}
      <EventList events={events} />
    </div>
  );
};

export default EventCat;
