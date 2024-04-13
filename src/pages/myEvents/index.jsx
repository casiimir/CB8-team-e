import Header from "@/components/header";
import MyEvents from "@/components/myEvents";
import NavBar from "@/components/navBar";
import { getSession } from "next-auth/react";

export default function myEventsList({ session }) {
  return (
    <>
      <Header />
      <MyEvents />
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
