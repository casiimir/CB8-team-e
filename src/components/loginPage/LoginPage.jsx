import { useState } from 'react';
import styles from './index.module.scss';
import Button from '../button';
import Input from '../input';
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";



const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSetEmail = (e) => setEmail(e.target.value);
    const handleSetPassword = (e) => setPassword(e.target.value);
    const handleSumbit = (e) => { e.preventDefault()
        console.log(email, password)
    };
    return (
        <div className={styles.LoginPage}>
            
        <h2 className={styles.Title_LoginPage}>Accedi alla Moveeda!</h2>

        <form  className={styles.Form} onSubmit={handleSumbit}>
        <label htmlFor="username" className={styles.Label}>Username o Email: </label>
        <div className={styles.Box_Input}>
        < Input type="text" value={email} onChange={handleSetEmail} icon={ <FiMail />} /> 
        </div> 

        <label htmlFor="password" className={styles.Label} >Password:</label>
        <div className={styles.Box_Input}>
        < Input type="password" value={password} onChange={handleSetPassword} icon={ <RiLockPasswordLine/> } /> 
        </div> 
        </form>

        < Button textButton="Accedi" onClick={handleSumbit} type="submit" />

         <p>Non hai un account Moveeda?? <a href="./sign">Registrati</a> </p>   
        </div>
    );
}


export default LoginPage;