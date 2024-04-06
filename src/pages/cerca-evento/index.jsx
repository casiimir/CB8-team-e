import styles from "./index.module.scss";

import { useState } from "react";

import Header from "@/components/header";
import EventCat from "@/components/eventCat";
import NavBar from "@/components/navBar";

export default function searchEvent() {
  const [inputValue, setInputValue] = useState("");
  const [eventData, setEventData] = useState({});

  const onInputInsert = (e) => setInputValue(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/events/search?title=${inputValue}`)
      .then((res) => res.json())
      .then((data) => setEventData(data.data));
  };

  return (
    <>
      <Header />
      <form className={styles.FormSearchEvent} onSubmit={onHandleSubmit}>
        <input
          type="text"
          placeholder="Cerca evento"
          className={styles.SearchEvent}
          onChange={onInputInsert}
          value={inputValue}
        />
        <input type="submit" value="Cerca" className={styles.SearchEventBtn} />
      </form>
      <div className={styles.EventContainer}>
        {eventData?.length > 0 &&
          eventData.map((event) => (
            <div key={event._id}>
              <h2>{event.title}</h2>
              <img src={`events/${event.poster}`} alt={event.title} />
              <div className={styles.EventInfo}>
                <p>Data: {event.date}</p>
                <p>Ore {event.time}</p>
              </div>
              <p className={styles.EventDescription}>{event.description}</p>
            </div>
          ))}
      </div>
      <EventCat />

      <NavBar />
    </>
  );
}
