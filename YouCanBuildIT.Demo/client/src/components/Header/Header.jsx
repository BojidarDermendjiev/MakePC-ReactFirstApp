import { Link } from "react-router-dom";
import { navigation } from "../../context/common/navigations";
import styles from "../../assets/styles/header.module.css";

export default function Header() {
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
              About
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getHardwareBlogUrl()}>
              Forum
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={navigation.getFeedBackUrl()}>
              Reviews
            </Link>
          </li>
          <li className={styles.language}>
            <Link className={styles.link} to="#">
              Language
            </Link>
            <ul className={styles.dropdown}>
              <li>English(EN-ES)</li>
              <li>Български(BG)</li>
            </ul>
          </li>
        </ul>
        <ul className={styles.rightNav}>
          <li>
            <Link className={styles.link} to={navigation.getSignInUrl()}>
              Sign in
            </Link>
          </li>
          <li className={styles.sign}>
            <Link className={styles.link} to={navigation.getSignUpUrl()}>
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
