import styles from "./index.module.scss";
import EventCat from "../eventCat";
import EventList from "../eventList";

import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";

const searchEvent = () => {
  const [inputValue, setInputValue] = useState("");
  const [eventData, setEventData] = useState([]);
  const [showEventCat, setShowEventCat] = useState(true);
  const [showEventResult, setShowEventResult] = useState(false);

  const onInputInsert = (e) => setInputValue(e.target.value);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/search?query=${inputValue}`)
      .then((res) => res.json())
      .then((data) => setEventData(data.data));
    setShowEventResult(true);
    setShowEventCat(false);
  };

  //Funzione che torna indietro dall'anteprima dell'evento
  const handleGoBack = () => {
    setEventData({});
    setShowEventResult(false);
    setShowEventCat(true);
    setInputValue("");
  };

  return (
    <>
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
      <div className={styles.EventCatContainer}>
        {showEventCat && <EventCat />}
      </div>
      <div className={styles.EventContainer}>
        {eventData?.length > 0 && <EventList events={eventData} />}
        {showEventResult && (
          <FaCircleArrowLeft
            onClick={handleGoBack}
            className={styles.BackArrow}
          />
        )}
      </div>
    </>
  );
};

export default searchEvent;
