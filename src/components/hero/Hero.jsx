import styles from "./index.module.scss";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className={styles.Slider}>
      <FaAngleLeft className={styles.Arrow} />
      <FaAngleRight className={styles.Arrow} />
    </div>
  );
};

export default Hero;
