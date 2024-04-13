import { getSession } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Header from "@/components/header";
import EventList from "@/components/eventList";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export default function MyTickets({ session }) {
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
    const getTickets = async () => {
      const tickets = await HTTP_GET(
        `reservations/getUserReservations?userId=${session?.user?.id}`
      );
      setTickets(tickets);
    };
    getTickets();
  }, [session, router]);

  return (
    <>
      <Header />
      <EventList
        title={"Le mie prenotazioni"}
        events={tickets}
        endPoint={"ticket"}
      />
      <NavBar userType={session.user.type} />
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
