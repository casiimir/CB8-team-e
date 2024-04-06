import styles from './index.module.scss';

const Input = ({ type, placeholder, required, value, onChange, icon }) => {

    return (
        <div className={styles.BoxInput}>
          <div className={styles.Icon} >{icon}</div>
          <input
            type={type}
            placeholder={placeholder}
            className={styles.Input}
            required={required}
            value={value}
            onChange={onChange}
          />
        </div>
      );
    };



export default Input;