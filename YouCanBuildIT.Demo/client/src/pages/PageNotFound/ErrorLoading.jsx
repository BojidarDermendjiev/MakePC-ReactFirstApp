import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/errorLoading.module.css";
import "../../utils/i18n";

const ErrorLoading = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>{t("errorLoading.title")}</h1>
      <p className={styles.errorMessage}>{t("errorLoading.message")}</p>
    </div>
  );
};

export default ErrorLoading;
