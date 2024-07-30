import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/header.module.css";
import { navigation } from "../../context/common/navigations";
import { LanguageContext } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(LanguageContext);
  const { isSignUp, toggleForm } = useContext(AuthContext);
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
              {t("header.about")}
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getHardwareBlogUrl()}>
              {t("header.forum")}
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getFeedBackUrl()}>
              {t("header.reviews")}
            </Link>
          </li>
          <li
            className={styles.language}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <Link className={styles.link} to="#">
              {t("header.language")}
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
            <Link
              className={styles.link}
              to={navigation.getLoginUrl()}
              onClick={() => toggleForm(false)}
            >
              {t("header.signIn")}
            </Link>
          </li>
          <li className={styles.sign}>
            <Link
              className={styles.link}
              to={navigation.getLoginUrl()}
              onClick={() => toggleForm(true)}
            >
              {t("header.signUp")}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
