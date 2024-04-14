import { HTTP_GET } from "../../../libs/HTTP";
import { useState, useEffect } from "react";
import EventList from "@/components/eventList";
import Pages from "@/components/pages";

const MyEvents = ({userId}) => {
  const [myEvents, setMyEvents] = useState([]);
  const [pageEvents, setPageEvents] = useState(1);


  useEffect(() => {
    fetch(`api/events/search?organizerId=${userId}`)
      .then((res) => res.json())
      .then((data) => setMyEvents(data));
  }  ,
   []);

  
  const handlePageChange = (pageNumber) => {
    setPageEvents(pageNumber);
    fetch(
          `api/events/search?organizerId=${userId}&page=${pageNumber}`
        )
          .then((res) => res.json())
          .then((data) => setMyEvents(data));
};



  return (
  <> 
  <EventList title={"i miei eventi"} events={myEvents.data} />
  < Pages 
  pagesNumber={myEvents?.totalPages}
  page={myEvents?.currentPage}
  setPage={handlePageChange}
  />
  </>
  )
};

export default MyEvents;
