import { useState } from "react";
import styles from "./index.module.scss";
import Button from "../button";
import Input from "../input";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPassword = (e) => setPassword(e.target.value);
  const handleSumbit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      router.push("/");
    } else {
      console.log(result.error);
    }
  };
  return (
    <div className={styles.LoginPage}>
      <h2 className={styles.Title_LoginPage}>Accedi alla Moveeda!</h2>

      <form className={styles.Form} onSubmit={handleSumbit}>
        <label htmlFor="username" className={styles.Label}>
          Username:{" "}
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleSetUsername}
            icon={<FiMail />}
          />
        </div>

        <label htmlFor="password" className={styles.Label}>
          Password:
        </label>
        <div className={styles.Box_Input}>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleSetPassword}
            icon={<RiLockPasswordLine />}
          />
        </div>
      </form>

      <Button textButton="Accedi" onClick={handleSumbit} type="submit" />

      <p>
        Non hai un account Moveeda?? <a href="./sign">Registrati</a>{" "}
      </p>
    </div>
  );
};

export default LoginPage;
