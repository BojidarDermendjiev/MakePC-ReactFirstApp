import styles from "../../assets/styles/loading.module.css";

export default function Spiner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.gear} ${styles.gear1}`}>
        <img
          src="https://assets.codepen.io/6093409/gear.svg.png"
          alt="an illustration of a gear"
        />
      </div>
      <div className={`${styles.gear} ${styles.gear2}`}>
        <img
          src="https://assets.codepen.io/6093409/gear.svg.png"
          alt="an illustration of a gear"
        />
      </div>
    </div>
  );
}
