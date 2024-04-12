import { getSession } from "next-auth/react";

import Header from "@/components/header";
import AddEvent from "@/components/addEvent";
import NavBar from "@/components/navBar";

export default function AddEventPage({ session }) {
  return (
    <>
      <Header />
      <AddEvent />
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
