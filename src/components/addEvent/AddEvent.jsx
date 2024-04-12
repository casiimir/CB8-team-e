import styles from "./index.module.scss";

import { HTTP_POST, HTTP_GET } from "../../../libs/HTTP";
import { useEffect, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import ImageProfile from "../imageProfile";
import Input from "../input";

const AddEvent = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
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
      setCategories(categories);
    };
    getCategories();
  }, []);

  return (
    <div className={styles.AddEvent}>
      <h1>Aggiungi evento</h1>
      <form onSubmit={handleSubmit} className={styles.FormAddEvent}>
        <select name="category" onChange={handleChange}>
          {categories.map((category, key) => (
            <option key={key} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titolo evento"
        />
        <Input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Numero biglietti"
        />
        <Input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrizione evento"
        />
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <ImageProfile
          onImageChange={handleImageChange}
          icon={<MdAddPhotoAlternate />}
          type="events"
        />
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Città"
        />
        <Input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Luogo"
        />
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Indirizzo"
        />
        <Input type="submit" value="Salva" extraClass="pippo" />
      </form>
    </div>
  );
};

export default AddEvent;
