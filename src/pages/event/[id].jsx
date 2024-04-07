import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { HTTP_GET, HTTP_POST } from "../../../libs/HTTP";
import styles from "@/styles/Event.module.scss";
import BannerEvent from "@/components/bannerEvent";
import EventDetails from "@/components/eventDetails";
import Button from "@/components/button";
import Input from "@/components/input";

export default function Event({ session }) {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [ticketsNumber, setTicketsNumber] = useState(1);

  const onClickPrenota = async () => {
    const reservation = {
      userId: session.user.id,
      eventId: event._id,
      ticketsBooked: ticketsNumber,
    };

    const res = await HTTP_POST("reservations", reservation);

    if (res.newReservation) {
      router.push(`../ticket/${res.newReservation._id}`);
    } else {
      alert("Prenotazione fallita!");
    }
  };

  const handleSetTicketNumber = (e) => {
    setTicketsNumber(e.target.value);
  };

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

  useEffect(() => {
    const loadSession = async () => {
      if (!session) router.push("/login");
    };
    loadSession();
  }, [router, session]);

  return (
    <>
      {Object.keys(event).length > 0 ? (
        <div className={styles.Event}>
          <div className={styles.Wrapper}>
            <BannerEvent img={event.poster} title={event.title} />
            <EventDetails event={event} />
            <div className={styles.Prenota}>
              <Input
                type={"number"}
                required={true}
                value={ticketsNumber}
                onChange={handleSetTicketNumber}
              />
              <Button textButton={"Prenota"} onClick={onClickPrenota} />
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
