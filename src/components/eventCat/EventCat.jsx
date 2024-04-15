import styles from "./index.module.scss";

import EventList from "../eventList";
import { useState, useEffect } from "react";
import { HTTP_GET } from "../../../libs/HTTP";
import Pages from "../pages";

const EventCat = () => {
  const [categoriesData, setCategoriesData] = useState([{}]);
  const [events, setEvents] = useState([]);
  const [pageEvents, setPageEvents] = useState(1);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const categories = await HTTP_GET("categories");
      setCategoriesData(categories.data);
    };
    getCategories();
  }, []);

  const handlePageChange = async (pageNumber) => {
    setPageEvents(pageNumber);
    const events = HTTP_GET(
      `events/getEventsByCategory?category=${categoryName}&page=${pageNumber}`
    );
    setEvents(events);
  };

  const onHandleCategory = async (categoryName) => {
    setCategoryName(categoryName);
    const events = await HTTP_GET(
      `events/getEventsByCategory?category=${categoryName}&page=1`
    );
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
            <img
              src={`categories/${categoria.background}`}
              alt={categoria.name}
            />
            <div className={styles.OverlayCardCat}>
              <h4>{categoria?.name?.toUpperCase()}</h4>
            </div>
          </div>
        ))}
      </div>
      {events?.data?.length > 0 && (
        <>
          <EventList title={events.data[0].category} events={events.data} />

          <Pages
            pagesNumber={events?.totalPages}
            page={events?.currentPage}
            setPage={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default EventCat;
