import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/logout.module.css";
import { navigation } from "../../common/navigations";

export default function Logout() {
  const { t } = useTranslation();

  return (
    <section className={styles.logout}>
      <h1 className={styles.title}>{t("logout.title")}</h1>
      <Link className={styles.homeBtn} to={navigation.getHomeUrl()}>
        {t("logout.home")}
      </Link>
    </section>
  );
}
