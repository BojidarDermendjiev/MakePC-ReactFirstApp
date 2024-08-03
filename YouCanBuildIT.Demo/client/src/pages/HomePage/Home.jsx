import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/home.module.css";
import { navigation } from "../../context/common/navigations";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <article className={styles.container}>
        <section className={styles.intro}>
          <h1 className={styles.title}>{t("homePage.welcomeTitle")}</h1>
          <p className={styles.text}>{t("homePage.welcomeText")}</p>
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
          {t("homePage.learnMore")}
        </Link>
      </div>

      <div className={styles.logos}>
        <div className={styles.logosSlide}>
          <img
            src="../../src/assets/img/image-removebg-preview (3).png"
            alt="razer img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (4).png"
            alt="amd img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (5).png"
            alt="intel img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (6).png"
            alt="nvidia img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (13).png"
            alt="msi img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (14).png"
            alt="asrock img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (15).png"
            alt="aorus img"
          />
          {/* Duplicate the images for seamless looping */}
          <img
            src="../../src/assets/img/image-removebg-preview (3).png"
            alt="razer img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (4).png"
            alt="amd img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (5).png"
            alt="intel img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (6).png"
            alt="nvidia img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (13).png"
            alt="msi img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (14).png"
            alt="asrock img"
          />
          <img
            src="../../src/assets/img/image-removebg-preview (15).png"
            alt="aorus img"
          />
        </div>
      </div>
    </>
  );
}
