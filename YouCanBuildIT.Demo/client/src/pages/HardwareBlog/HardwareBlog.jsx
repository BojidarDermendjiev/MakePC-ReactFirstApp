import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/hardwareBlog.module.css";
import { navigation } from "../../common/navigations";

export default function HardwareBlog() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>{t("forum.header")}</h1>

        <section className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.subHeader}>{t("forum.gpuNews")}</h2>
            <img
              src="../../src/assets/img/geforce-ada-4090-web-og-1200x630@2x.jpg"
              alt="GPU"
              className={styles.image}
            />
            <p className={styles.paragraph}>{t("forum.gpuDescription")}</p>
            <Link
              to={navigation.getInvidiaUrl()}
              target="_blank"
              className={styles.button}
            >
              {t("forum.readMore")}
            </Link>
          </div>

          <div className={styles.card}>
            <h2 className={styles.subHeader}>{t("forum.cpuNews")}</h2>
            <img
              src="../../src/assets/img/newsroom-innovation-13th-gen-intel-core-1-feat.jpg"
              alt="GPU"
              className={styles.image}
            />
            <p className={styles.paragraph}>{t("forum.cpuDescription")}</p>
            <Link
              to={navigation.getIntel13GenUrl()}
              target="_blank"
              className={styles.button}
            >
              {t("forum.readMore")}
            </Link>
          </div>

          <div className={styles.card}>
            <h2 className={styles.subHeader}>{t("ramNews")}</h2>
            <img
              src="../../src/assets/img/G.Skill-Trident-Z5-RGB.jpg"
              alt="GPU"
              className={styles.image}
            />
            <p className={styles.paragraph}>{t("forum.ramDescription")}</p>
            <Link
              to={navigation.getRamDDR5Url()}
              target="_blank"
              className={styles.button}
            >
              {t("forum.readMore")}
            </Link>
          </div>

          <div className={styles.card}>
            <h2 className={styles.subHeader}>{t("forum.otherHardwareNews")}</h2>
            <img
              src="../../src/assets/img/Samsung-nand-624x351.jpg"
              alt="GPU"
              className={styles.image}
            />
            <p className={styles.paragraph}>
              {t("forum.otherHardwareDescription")}
            </p>
            <Link
              to={navigation.getSSDsUrl()}
              target="_blank"
              className={styles.button}
            >
              {t("forum.readMore")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
