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
    <>
      <div className={styles.EventCatContainer}>
        {categoriesData.map((categoria) => (
          <div
            className={styles.EventCardCat}
            key={categoria._id}
            onClick={() => onHandleCategory(categoria.name)}
          >
            <div className={styles.OverlayCardCat}>
              <h4>{categoria.name}</h4>
            </div>
            <img
              src={`categories/${categoria.background}`}
              alt={categoria.name}
            />
          </div>
        ))}
      </div>
      <EventList events={events} />
    </>
  );
};

export default EventCat;
