import styles from "./index.module.scss";
import Input from "../input";
import Button from "../button";
import ImageProfile from "../ImageProfile";
import { useState, useReducer } from "react";
import { FaRegUser } from "react-icons/fa";
import { TiBusinessCard } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { LiaMapPinSolid } from "react-icons/lia";
import { ImMobile } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAddPhotoAlternate } from "react-icons/md";
import { HTTP_POST } from "../../../libs/HTTP";

const RegisterPage = () => {
  const [tempPass, setTempPass] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleTempPassChange = (e) => {
    setTempPass(e.target.value);
  };

  const handleImageChange = (image) => {
    setUploadedFile(image);
    handleFieldChange("imageProfile", image);
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
    }
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    email: "",
    password: "",
    type: "user",
    username: "",
    businessName: "",
    name: "",
    surname: "",
    imageProfile: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const handleFieldChange = (field, value) => {
    dispatchFormState({ type: "SET_FIELD", field, value });
  };

  const handleConfirmPassword = (confPass) => {
    console.warn(tempPass, confPass, ":", tempPass === confPass);

    if (tempPass === confPass) {
      handleFieldChange("password", tempPass);
    } else {
      handleFieldChange("password", "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    formState.type = formState.type.toLowerCase();
    formState.imageProfile = uploadedFile;
    await HTTP_POST(`users/`, formState);
  };

  return (
    <div className={styles.RegisterPage}>
      <h2 className={styles.Title_RegisterPage}>Accedi alla Moveeda!</h2>

      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="type" className={styles.Label}>
          Voglio partecipare agli eventi o crearli?
        </label>
        <div className={styles.Box_Input_S}>
          <select
            name="type"
            id=""
            className={styles.Select}
            onChange={(e) => {
              handleFieldChange("type", e.target.selectedOptions[0].label);
            }}
          >
            <option value={formState.type} className={styles.Option}>
              User
            </option>
            <option value={formState.type} className={styles.Option}>
              Business
            </option>
          </select>
        </div>

        <label htmlFor="username" className={styles.Label}>
          Username:{" "}
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.username}
            onChange={(e) => {
              handleFieldChange("username", e.target.value);
            }}
            icon={<FaRegUser />}
          />
        </div>
        {formState.type === "Business" ? (
          <>
            <label htmlFor="businessName" className={styles.Label}>
              Username Business:{" "}
            </label>
            <div className={styles.Box_Input}>
              <Input
                type="text"
                value={formState.businessName}
                onChange={(e) => {
                  handleFieldChange("businessName", e.target.value);
                }}
                icon={<TiBusinessCard />}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <label htmlFor="email" className={styles.Label}>
          Email
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.email}
            onChange={(e) => {
              handleFieldChange("email", e.target.value);
            }}
            icon={<FiMail />}
          />
        </div>

        <label htmlFor="password" className={styles.Label}>
          Password:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="password"
            value={tempPass}
            onChange={handleTempPassChange}
            icon={<RiLockPasswordLine />}
          />
        </div>

        <label htmlFor="confirmPassword" className={styles.Label}>
          Conferma password:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="password"
            icon={<RiLockPasswordLine />}
            onChange={(e) => {
              handleConfirmPassword(e.target.value);
            }}
          />
        </div>

        <p>Le password devono corrispondere. Riprova</p>

        <label htmlFor="name" className={styles.Label}>
          Nome:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.name}
            onChange={(e) => {
              handleFieldChange("name", e.target.value);
            }}
            icon={<MdDriveFileRenameOutline />}
          />
        </div>

        <label htmlFor="surname" className={styles.Label}>
          Cognome:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.surname}
            onChange={(e) => {
              handleFieldChange("surname", e.target.value);
            }}
            icon={<MdDriveFileRenameOutline />}
          />
        </div>

        <ImageProfile
          onImageChange={handleImageChange}
          icon={<MdAddPhotoAlternate />}
        />

        <label htmlFor="city" className={styles.Label}>
          Città
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.city}
            onChange={(e) => {
              handleFieldChange("city", e.target.value);
            }}
            icon={<FaMapMarkedAlt />}
          />
        </div>

        <label htmlFor="address" className={styles.Label}>
          Indirizzo:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.address}
            onChange={(e) => {
              handleFieldChange("address", e.target.value);
            }}
            icon={<LiaMapPinSolid />}
          />
        </div>

        <label htmlFor="phoneNumber" className={styles.Label}>
          Cellulare:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            value={formState.phoneNumber}
            onChange={(e) => {
              handleFieldChange("phoneNumber", e.target.value);
            }}
            icon={<ImMobile />}
          />
        </div>
      </form>

      <Button textButton="Registrati" onClick={handleSubmit} type="submit" />
    </div>
  );
};

export default RegisterPage;
