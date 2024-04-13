import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import EventList from "@/components/eventList";

const MyEvents = () => {
  const [myEvent, setMyEvents] = useState([]);
  useEffect(() => {
    const getMyEvents = async () => {
      const events = await HTTP_GET(
        `events/search?organizerId=3 
        `
      );
      setMyEvents(events);
    };
    getMyEvents();
  }, []);
  return <EventList title={"i miei eventi"} events={myEvent} />;
};

export default MyEvents;
