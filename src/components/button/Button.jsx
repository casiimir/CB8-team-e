import styles from './index.module.scss';

const Button = ({ onClick, textButton, type }) => {
    return (
        <button className={styles.Button} onClick={onClick} type={type}>
            {textButton}  </button>
    );
}   

export default Button;