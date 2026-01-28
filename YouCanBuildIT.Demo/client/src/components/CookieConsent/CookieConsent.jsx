import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/cookieConsent.module.css";

const COOKIE_CONSENT_KEY = "makepc_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        acceptedAt: new Date().toISOString(),
      }),
    );
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem(
      COOKIE_CONSENT_KEY,
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        acceptedAt: new Date().toISOString(),
      }),
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <h4 className={styles.title}>
            <span className={styles.cookieIcon}>🍪</span>
            {t("cookies.title", "We use cookies")}
          </h4>
          <p className={styles.description}>
            {t(
              "cookies.description",
              "We use cookies to improve your experience on our site. Cookies help us understand how you use our website and allow us to remember your preferences.",
            )}{" "}
            <a href="/privacy-policy">{t("cookies.learnMore", "Learn more")}</a>
          </p>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.acceptNecessaryButton}`}
            onClick={handleAcceptNecessary}
          >
            {t("cookies.acceptNecessary", "Necessary Only")}
          </button>
          <button
            className={`${styles.button} ${styles.acceptAllButton}`}
            onClick={handleAcceptAll}
          >
            {t("cookies.acceptAll", "Accept All")}
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility function to check cookie consent
export const getCookieConsent = () => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
};

// Utility function to check if specific cookie type is allowed
export const isCookieAllowed = (type) => {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[type] === true;
};

// Utility function to reset cookie consent (for settings page)
export const resetCookieConsent = () => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
};
