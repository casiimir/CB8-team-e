import styles from "./index.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";

const EventCat = () => {
  const [categoriesData, setCategoriesData] = useState([{}]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => setCategoriesData(categories.data));
  }, []);

  return (
    <div className={styles.EventCatContainer}>
      {categoriesData.map((categoria) => (
        <Link href={`../category/${categoria.name}`}>
          <div className={styles.EventCardCat} key={categoria._id}>
            <div className={styles.Overlay}>
              <h4>{categoria.name}</h4>
            </div>
            <img
              src={`categories/${categoria.background}`}
              alt={categoria.name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventCat;
