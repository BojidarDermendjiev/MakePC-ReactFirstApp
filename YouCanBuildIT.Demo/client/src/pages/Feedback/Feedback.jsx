import { Link } from "react-router-dom";
import styles from "../../assets/styles/feedback.module.css";
import { navigation } from "../../context/common/navigations";

export default function Feedback() {
  return (
    <div className={styles.section__container}>
      <div className={styles.header}>
        <h1>What our clients say about us.</h1>
      </div>
      <div className={styles.testimonials__grid}>
        <div className={styles.card}>
          <p>
            I've been working with these guys for a long time and I can say that
            my house is in the perfect hands.
          </p>
          <img src="../../src/assets/img/pic-1.jpg" alt="user" />
          <p className={styles.name}>Allan Collins</p>
          {/* <button>Edit</button>
          <button>Delete</button> */}
        </div>
      </div>
      {/* <div className={styles.footer}>
        <h4>No two homes are alike!</h4>
        <p>
          Our Elite network, combined with your personal needs, allows us to
          create a home plan specifically tailored to you.
        </p>
        <button>GET A QUOTE</button>
      </div> */}
      <div className={styles.btn}>
        <h1>Buy me a coffee 😊</h1>
        <Link className={styles.donation} to={navigation.getDonationUrl()}>
          Donation
        </Link>
      </div>
    </div>
  );
}
