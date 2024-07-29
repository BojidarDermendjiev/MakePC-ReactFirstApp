import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/header.module.css";
import { navigation } from "../../context/common/navigations";
import { LanguageContext } from "../../context/LanguageContext";

export default function Header() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const showDropdown = () => {
    setDropdownOpen(true);
  };

  const hideDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng, hideDropdown);
  };
  return (
    <header>
      <nav className={styles.navigationBar}>
        <ul className={styles.leftNav}>
          <li>
            <Link className={styles.link} to={navigation.getHomeUrl()}>
              <img
                className={styles.logo}
                src="/img/Artboard 1.png"
                alt="homepage"
              />
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getAboutUrl()}>
              {t("about")}
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getHardwareBlogUrl()}>
              {t("forum")}
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getFeedBackUrl()}>
              {t("reviews")}
            </Link>
          </li>
          <li
            className={styles.language}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <Link className={styles.link} to="#">
              {t("language")}
            </Link>
            {dropdownOpen && (
              <ul className={styles.dropdown}>
                <li onClick={() => handleLanguageChange("en")}>
                  English(EN-ES)
                </li>
                <li onClick={() => handleLanguageChange("bg")}>
                  Български(BG)
                </li>
              </ul>
            )}
          </li>
        </ul>
        <ul className={styles.rightNav}>
          <li>
            <Link className={styles.link} to={navigation.getLoginUrl()}>
              {t("signIn")}
            </Link>
          </li>
          <li className={styles.sign}>
            <Link className={styles.link} to={navigation.getRegisterUrl()}>
              {t("signUp")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
