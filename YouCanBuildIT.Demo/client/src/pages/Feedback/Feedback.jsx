import { navigation } from "../../context/common/navigations";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/feedback.module.css";
export default function Feedback() {
  return (
    <>
      <p>Feedback</p>
      <div className={styles.btn}>
        <Link className={styles.donation} to={navigation.getDonationUrl()}>
          Donation
        </Link>
      </div>
    </>
  );
}
