import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import HTTP_GET from "../../../libs/HTTP";
import styles from "./event.module.scss";
import Container from "@/components/container";
import BannerEvent from "@/components/bannerEvent";
import EventDetails from "@/components/eventDetails";
export default function Event() {
  const router = useRouter();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      HTTP_GET(`events/${router.query.id}`).then(async (eventData) => {
        const organizer = await HTTP_GET(`users/${eventData?.organizerId}`);
        const actualEvent = {
          ...eventData,
          organizer: organizer?.businessName,
        };
        setEvent(actualEvent);
      });
    };
    getEvent();
  }, [router.query.id]);

  return (
    <>
      {event ? (
        <div className={styles.Event}>
          <div className={styles.Wrapper}>
            <BannerEvent img={event.poster} title={event.title} />
            <EventDetails event={event} />
            <div className={styles.Prenota}>
              <input type="number" />
              <button>Prenota</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
