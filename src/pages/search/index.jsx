import Header from "@/components/header";
import SearchEvent from "../../components/searchEvent";
import { getSession } from "next-auth/react";
import NavBar from "@/components/navBar";

export default function SearchEventPage({ session }) {
  return (
    <>
      <Header />
      <SearchEvent />
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
