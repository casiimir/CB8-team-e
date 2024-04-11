import styles from "@/styles/404.module.scss";

export default function Custom404() {
  return (
    <>
      <div className={styles.container}>
        <img src="/404gif.gif" alt="404 gif" className={styles.gif} />
        <h3>this is not cool</h3>
      </div>

      <h1>
        Please, try something <span>else</span>
      </h1>
    </>
  );
}
