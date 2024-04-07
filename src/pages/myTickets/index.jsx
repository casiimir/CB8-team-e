import styles from "@/styles/MyTickets.module.scss";
import { getSession } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import EventList from "@/components/eventList";

export default function MyTickets({ session }) {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const getTickets = async () => {
      HTTP_GET(
        `reservations/getUserReservations?userId=${session.user.id}`
      ).then((reservations) => {
        reservations.map((ticket) => {
          HTTP_GET(`events/${ticket.eventId}`).then((event) => {
            setTickets((prev) => [...prev, event]);
          });
        });
      });
    };
    getTickets();
  }, [session]);
  return <EventList title={"le mie prenotazioni"} events={tickets} />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
