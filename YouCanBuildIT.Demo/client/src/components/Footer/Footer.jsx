import { Link } from "react-router-dom";
import styles from "../../assets/styles/footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <Link to="#" className={`${styles.icon} ${styles.instagram}`}>
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link to="#" className={`${styles.icon} ${styles.linkedin}`}>
          <i className="fa-brands fa-linkedin-in"></i>
        </Link>
        <Link to="#" className={`${styles.icon} ${styles.youtube}`}>
          <i className="fa-brands fa-youtube"></i>
        </Link>
        <Link to="#" className={`${styles.icon} ${styles.twitter}`}>
          <i className="fa-brands fa-x-twitter"></i>
        </Link>
        <Link to="#" className={`${styles.icon} ${styles.github}`}>
          <i className="fa-brands fa-github"></i>
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles["info-btn"]}>
          <h1>Contacts</h1>
          <h4 className={styles.button}>Support</h4>
          <p className={styles.button}>support@makeIT.com</p>
        </div>
        <div className={styles["info-btn"]}>
          <h1>Sales</h1>
          <p className={styles.button}>sales@makeIT.com</p>
          <p className={styles.button}>+359888788804</p>
        </div>
      </div>
    </footer>
  );
}
