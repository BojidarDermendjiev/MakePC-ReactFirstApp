import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/header.module.css";
import { navigation } from "../../context/common/navigations";
import { LanguageContext } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContextProvider";
import { logout } from "../../API/authentication";

export default function Header() {
  const { t } = useTranslation();

  const { user, setUser } = useContext(AuthContext);
  const { changeLanguage } = useContext(LanguageContext);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const showDropdown = () => {
    setDropdownOpen(true);
  };

  const hideDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng, hideDropdown);
  };

  const handleLogout = async () => {
    await logout(setUser);
    navigate(navigation.getHomeUrl());
  };

  return (
    <header>
      <nav className={styles.navigationBar}>
        <ul className={styles.leftNav}>
          <li className={styles.navigations}>
            <Link className={styles.link} to={navigation.getHomeUrl()}>
              <img
                className={styles.logo}
                src="/img/Artboard 1.png"
                alt="homepage"
              />
            </Link>
          </li>
          <li className={styles.navigations}>
            <Link className={styles.link} to={navigation.getAboutUrl()}>
              {t("header.about")}
            </Link>
          </li>
          <li className={styles.navigations}>
            <Link className={styles.link} to={navigation.getHardwareBlogUrl()}>
              {t("header.forum")}
            </Link>
          </li>
          <li className={styles.navigations}>
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
