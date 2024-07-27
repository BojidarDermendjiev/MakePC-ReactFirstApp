import styles from "../../assets/styles/home.module.css";
import { Link } from "react-router-dom";
import { navigation } from "../../context/common/navigations";
navigation;
export default function Home() {
  return (
    <>
      <article className={styles.container}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Welcome to the MakeIT!</h1>
          <p className={styles.text}>
            Welcome to the world of computer building! This guide is designed to
            take you on an exciting journey, transforming you from a novice to a
            knowledgeable builder, capable of assembling your very own computer
            from the ground up. Whether you're looking to create a
            high-performance gaming rig, a powerful workstation, or a simple
            home PC, this comprehensive guide will provide you with the
            knowledge and confidence needed to achieve your goal.
          </p>
        </section>
        <section className={styles.imgSection}>
          <img
            className={styles.introImg}
            src="../../src/assets/img/image-removebg-preview.png"
            alt="computer items"
          />
        </section>
      </article>
      <div className={styles.btn}>
        <Link className={styles.learnMore} to={navigation.getAboutUrl()}>
          Learn More
        </Link>
      </div>
    </>
  );
}
