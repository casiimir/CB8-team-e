import styles from "./index.module.scss";
import EventList from "../eventList";
import { useState, useEffect } from "react";
import { HTTP_GET } from "../../../libs/HTTP";

const EventCat = () => {
  const [categoriesData, setCategoriesData] = useState([{}]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await HTTP_GET("categories");
      setCategoriesData(categories);
    };
    getCategories();
  }, []);

  const onHandleCategory = async (categoryName) => {
    const events = HTTP_GET(`/api/events/search?category=${categoryName}`);
    setEvents(events);
  };

  return (
    <>
      <div className={styles.EventCatContainer}>
        {categoriesData.map((categoria, key) => (
          <div
            className={styles.EventCardCat}
            key={key}
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
      {events.length > 0 && <EventList events={events} />}
    </>
  );
};

export default EventCat;
