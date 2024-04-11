import styles from "@/styles/Event.module.scss";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { HTTP_GET, HTTP_POST } from "../../../libs/HTTP";
import { FaCheck } from "react-icons/fa";

import Header from "@/components/header";
import BannerEvent from "@/components/bannerEvent";
import EventDetails from "@/components/eventDetails";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import NavBar from "@/components/navBar";

export default function Event({ session }) {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [ticketsNumber, setTicketsNumber] = useState(1);
  const [isToggled, setIsToggled] = useState(false);
  const [textModal, setTextModal] = useState("Evento prenotato!");
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = async () => {
    router.push(`../login`);
  };

  const onClickPrenota = async () => {
    if (!session) {
      setIsToggled(!isToggled);
      setTextModal("ERRORE Bisogna essere autenticati per prenotarsi!");
      return;
    }

    const reservation = {
      userId: session.user.id,
      eventId: event._id,
      ticketsBooked: ticketsNumber,
    };

    const res = await HTTP_POST("reservations", reservation);

    if (res.newReservation) {
      setIsToggled(!isToggled);
      setTicketId(res.newReservation._id);
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

  return (
    <>
      <Header />
      {Object.keys(event).length > 0 ? (
        <div className={styles.Event}>
          {isToggled && (
            <Modal
              status={<FaCheck />}
              text={textModal}
              buttonHandleSumbit={handleSubmit}
            />
          )}
          <div className={styles.Wrapper}>
            <BannerEvent img={event.poster} title={event.title} />
            <EventDetails event={event} />
          </div>
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
      ) : (
        <h1>Loading</h1>
      )}
      <NavBar userType={session?.user?.type} />
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
