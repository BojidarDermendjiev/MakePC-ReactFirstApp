import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "../assets/styles/header.module.css";
import { navigation } from "../common/navigations";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContextProvider";
import { CartContext } from "../context/CartContextProvider";
import { logout } from "../api/authentication";
import { serverOrigin } from "../common/generic";

import defaultAvatar from "../../public/img/image.png";

// Cart Icon SVG Component
const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function Header() {
  const { t } = useTranslation();

  const { user, setUser } = useContext(AuthContext);
  const { changeLanguage } = useContext(LanguageContext);
  const { cartItemCount } = useContext(CartContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const showDropdown = () => setDropdownOpen(true);
  const hideDropdown = () => setDropdownOpen(false);

  const handleLanguageChange = (lng) => {
    changeLanguage(lng, hideDropdown);
  };
  const handleUserSettings = () => {
    navigate(navigation.getUserSettingsUrl());
  };

  const handleLogout = async () => {
    await logout(setUser);
    navigate(navigation.getLogoutUrl());
  };

  return (
    <header>
      <nav className={styles.navigationBar}>
        <ul className={styles.leftNav}>
          <li className={styles.navigations}>
            <Link className={styles.link} to={navigation.getHomeUrl()}>
              <img
                className={styles.logo}
                src="/img/Artboard 2.png"
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
          {user ? (
            <>
              {/* Products Dropdown - Only for logged in users */}
              <li className={styles.productsDropdown}>
                <Link className={styles.link} to={navigation.getProductsUrl()}>
                  {t("header.products", "Products")}
                </Link>
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link className={styles.link} to={navigation.getNewHardwareUrl()}>
                      {t("header.newHardware", "New Hardware")}
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.link} to={navigation.getKeyboardsUrl()}>
                      {t("header.keyboards", "Keyboards")}
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.link} to={navigation.getSecondhandUrl()}>
                      {t("header.secondhand", "Secondhand")}
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Shopping Cart Icon - Only for logged in users */}
              <li className={styles.cartContainer}>
                <Link className={styles.cartLink} to="/cart">
                  <CartIcon />
                  {cartItemCount > 0 && (
                    <span className={styles.cartBadge}>
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </Link>
              </li>
              <li className={styles.avatarContainer}>
                <img
                  className={`${styles.avatarIcon} ${styles.profileDropdown}`}
                  src={
                    user.avatarUrl
                      ? user.avatarUrl.startsWith("http")
                        ? user.avatarUrl
                        : serverOrigin + user.avatarUrl
                      : defaultAvatar
                  }
                  onClick={handleUserSettings}
                />
              </li>
              <li className={styles.logout}>
                <Link
                  className={styles.link}
                  to={navigation.getLogoutUrl()}
                  onClick={handleLogout}
                >
                  {t("header.signOut")}
                </Link>
              </li>
            </>
          ) : (
            <li className={styles.signUp}>
              <Link className={styles.link} to={navigation.getLoginUrl()}>
                {t("header.signIn")}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
