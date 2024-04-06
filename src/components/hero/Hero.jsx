import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Container from "../container";

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((events) => setEvents(events.data));
  }, []);

  useEffect(() => {
    const updateCounter = async () => {
      setCounter((prev) => Number(!prev));
    };

    const intervalId = setInterval(updateCounter, 4000);
    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <Container>
      <div className={styles.Slider}>
        <div className={styles.Overlay}>
          <h5>{events[counter]?.title}</h5>
          <p>{events[counter]?.description}</p>
        </div>
        <div className={styles.BackgroundImage}>
          <img
            src={`events/${events[counter]?.poster}`}
            alt={events[counter]?.title}
          />
        </div>
        <div className={styles.Actions}>
          <FaAngleLeft className={styles.Arrow} />
          <FaAngleRight className={styles.Arrow} />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
