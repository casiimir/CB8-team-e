import styles from "./index.module.scss";

import { HTTP_POST, HTTP_GET } from "../../../libs/HTTP";
import { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";

import Button from "../Button";
import ImageProfile from "../imageProfile";
import Input from "../input";

const AddEvent = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    organizerId: `${userId}`,
    category: "",
    capacity: 0,
    title: "",
    description: "",
    date: "",
    time: "",
    poster: null,
    city: "",
    place: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (image) => {
    setFormData({
      ...formData,
      poster: image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await HTTP_POST("events", formData);
      console.log("Event added success:", response.data);
    } catch (error) {
      console.error("Error add event:", error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categories = await HTTP_GET("categories");
      setCategories(categories.data);
    };
    getCategories();
  }, []);

  return (
    <div className={styles.AddEvent}>
      <h1>Aggiungi evento</h1>
      <form onSubmit={handleSubmit} className={styles.FormAddEvent}>
        <div className={styles.Box_Input}>
          <select
            name="category"
            onChange={handleChange}
            className={styles.Select}
          >
            <option>Seleziona categoria</option>
            {categories.map((category, key) => (
              <option key={key} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Titolo evento"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Numero biglietti"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrizione evento"
          />
        </div>

        <div className={styles.Box_Input}>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Data evento"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <p>Carica un'immagine dell'evento</p>
        <div className={styles.Box_Input}>
          <ImageProfile
            onImageChange={handleImageChange}
            icon={<MdAddPhotoAlternate />}
            type="events"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Città"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            placeholder="Luogo"
          />
        </div>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Indirizzo"
          />
        </div>
        <Button type="submit" textButton="Salva" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddEvent;
