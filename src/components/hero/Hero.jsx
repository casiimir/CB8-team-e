import styles from "./index.module.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className={styles.Slider}>
      <FaAngleLeft className={styles.Arrow} />
      <FaAngleRight className={styles.Arrow} />
    </div>
  );
};

export default Hero;
