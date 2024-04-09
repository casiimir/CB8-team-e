import styles from "./index.module.scss";

const ImageProfile = ({ formState, handleFieldChange, icon }) => {
  return (
    <>
      <label htmlFor="imageProfile" className={styles.Label}>
        Carica un'immagine profilo
      </label>
      <div className={styles.Image_Profile}>
        <div className={styles.Icon}>{icon}</div>
        <input
          type="file"
          value={formState.imageProfile}
          onChange={(e) => {
            handleFieldChange("imageProfile", e.target.files[0]);
          }}
          className={styles.Btn}
        />
      </div>
    </>
  );
};

export default ImageProfile;
