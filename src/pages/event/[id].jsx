import styles from "@/styles/Event.module.scss";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { HTTP_GET, HTTP_POST, HTTP_PUT } from "../../../libs/HTTP";

import Header from "@/components/header";
import BannerEvent from "@/components/bannerEvent";
import EventDetails from "@/components/eventDetails";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import NavBar from "@/components/navBar";
import { ImSad } from "react-icons/im";
import Loader from "@/components/loader";
import EventMap from "@/components/eventMap";
import Footer from "@/components/footer";

export default function Event({ session }) {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [ticketsNumber, setTicketsNumber] = useState(1);
  const [isToggled, setIsToggled] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [statusModal, setStatusModal] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    switch (true) {
      case ticketsNumber > 4:
        setTicketsNumber(4);
        break;
      case event.capacity < ticketsNumber:
        setTicketsNumber(event.capacity);
        break;
      case event.capacity == 0:
        setIsToggled(true);
        setStatusModal("Attenzione");
        setModalTitle("Evento SOLD OUT");
        setTextModal("Non ci sono posti disponibili");
        break;
      default:
        setIsToggled(false);
        break;
    }
  }, [ticketsNumber, event.capacity]);

  const buttonHandleSubmit = () => {
    switch (statusModal) {
      case "Successo":
        setIsToggled(false);
        router.push(`/ticket/${ticketId}`);
        break;
      case "Errore":
        setIsToggled(false);
        break;
      case "Attenzione":
        setIsToggled(false);
        break;
      default:
    }
  };

  const handleUpdateData = async () => {
    const response = await fetch(`/api/events/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ capacity: event.capacity - ticketsNumber }),
    });
    const data = await response.json();
  };

  const onClickPrenota = async () => {
    if (!session) {
      setIsToggled(true);
      setStatusModal("Errore");
      setModalTitle("Iscrivi o Accedi");
      setTextModal("Bisogna essere registrati per prenotare la MOVEEDA!");
      return;
    }

    const reservation = {
      userId: session.user.id,
      eventId: event._id,
      ticketsBooked: ticketsNumber,
    };

    const res = await HTTP_POST("reservations", reservation);

    if (res.newReservation) {
      setIsToggled(true);
      setTicketId(res.newReservation._id);
      setStatusModal("Successo");
      setModalTitle("Prenotazione avvenuta con successo");
      setTextModal("La tua prenotazione è stata confermata!");
      handleUpdateData(event._id);
    } else {
      setIsToggled(true);
      setStatusModal("Errore");
      setModalTitle("Qualcosa è andato storto");
      setTextModal("Prenotazione fallita, riprova più tardi!");
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
              status={statusModal}
              title={modalTitle}
              text={textModal}
              buttonHandleSubmit={buttonHandleSubmit}
            />
          )}
          <div className={styles.Wrapper}>
            <BannerEvent img={event.poster} title={event.title} />
            <EventDetails event={event} />
            <EventMap address={event.address} />
          </div>
          <div className={styles.Prenota}>
            {event.capacity > 0 ? (
              <>
                <Input
                  type={"number"}
                  required={true}
                  value={ticketsNumber}
                  onChange={handleSetTicketNumber}
                />
                <Button textButton={"Prenota"} onClick={onClickPrenota} />
              </>
            ) : (
              <p>
                {" "}
                {event.title} ha esaurito il numero di prenotazioni disponibili!{" "}
                <ImSad />{" "}
              </p>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <NavBar userType={session?.user?.type} />
      <Footer />
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
