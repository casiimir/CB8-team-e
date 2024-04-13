import styles from "@/styles/User.module.scss";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { HTTP_GET } from "../../../libs/HTTP";

import Header from "@/components/header";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export default function User({ session }) {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUserData = await HTTP_GET(`users/${id}`);
        setUserData(fetchedUserData);
      } catch (error) {
        console.error("Errore durante il recupero dei dati utente:", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (!userData) {
    return <div>Caricamento...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.UserPage}>
        <div className={styles.UserCard}>
          <img
            src="https://img.freepik.com/foto-gratuito/vista-frontale-della-donna-di-smiley-con-auricolari_23-2148613052.jpg?t=st=~exp=1712763776~hmac=3e9ec9471ac47949b6e6abedf081fd02e2f09e98d49b421ce80407f8e6c0f2ed&w=996"
            alt="user"
          />
          {/* <img src={userData.imageProfile} alt={userData} /> */}
          <h2>{userData.username}</h2>
        </div>
        <div className={styles.User_Info}>
          <h1 className={styles.Type}>I miei dati</h1>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>NOME</p>
              <p>{userData.name}</p>
            </div>
            <div className={styles.Info}>
              <p>COGNOME</p> <p>{userData.surname}</p>
            </div>
          </div>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>CITTA'</p> <p>{userData.city}</p>
            </div>
          </div>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>INDIRIZZO</p>
              <p>{userData.address}</p>
            </div>
          </div>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>TELEFONO</p>
              <p>{userData.phoneNumber}</p>
            </div>
          </div>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>EMAIL</p>
              <p>{userData.email}</p>
            </div>
          </div>
          <div className={styles.Name_Surname}>
            <div className={styles.Info}>
              <p>TIPO UTENTE</p>
              <h3 className={styles.Type}>{userData.type.toUpperCase()}</h3>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
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
