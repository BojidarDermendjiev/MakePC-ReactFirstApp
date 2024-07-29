import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/home.module.css";
import { navigation } from "../../context/common/navigations";
import { LanguageContext } from "../../context/LanguageContext";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <article className={styles.container}>
        <section className={styles.intro}>
          <h1 className={styles.title}>{t("welcomeTitle")}</h1>
          <p className={styles.text}>{t("welcomeText")}</p>
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
          {t("learnMore")}
        </Link>
      </div>
    </>
  );
}
