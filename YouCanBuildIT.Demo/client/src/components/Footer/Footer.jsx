import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/footer.module.css";
import { navigationYoutobeVideo } from "../../common/youtobe";
import { navigation } from "../../common/navigations";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer>
      <div className={styles.info}>
        <div className={styles.infoService}>
          <h1>{t("footer.contacts")}</h1>
          <h4 className={styles.button}>{t("footer.support")}</h4>
          <p className={styles.button}>{t("footer.supportEmail")}</p>
          <h1>{t("footer.sales")}</h1>
          <p className={styles.button}>{t("footer.salesEmail")}</p>
          <p className={styles.button}>{t("footer.salesPhone")}</p>
        </div>
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${navigationYoutobeVideo.getIntoVideoUrl()}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <h1>CONNECT WITH US</h1>
      <div className={styles.wrapper}>
        <Link
          to={navigation.getInstagramUrl()}
          className={`${styles.icon} ${styles.instagram}`}
          target="_blank"
        >
          <i className="fa-brands fa-instagram"></i>
        </Link>
        <Link
          to={navigation.getLinkedInUrl}
          className={`${styles.icon} ${styles.linkedin}`}
          target="_blank"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </Link>
        <Link
          to={navigation.getYouTubeUrl()}
          className={`${styles.icon} ${styles.youtube}`}
          target="_blank"
        >
          <i className="fa-brands fa-youtube"></i>
        </Link>
        <Link
          to={navigation.getTwitterUrl()}
          className={`${styles.icon} ${styles.twitter}`}
          target="_blank"
        >
          <i className="fa-brands fa-x-twitter"></i>
        </Link>
        <Link
          to={navigation.getGithubUrl()}
          className={`${styles.icon} ${styles.github}`}
          target="_blank"
        >
          <i className="fa-brands fa-github"></i>
        </Link>
      </div>
    </footer>
  );
}
