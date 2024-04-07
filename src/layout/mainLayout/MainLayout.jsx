import styles from "./index.module.scss";

import NavBar from "@/components/navBar";
import Header from "../../components/header";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.MainLayout}>
      <Header />
      <NavBar />

      {children}
    </div>
  );
};

export default MainLayout;
