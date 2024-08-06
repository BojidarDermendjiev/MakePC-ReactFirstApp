import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/invalidPassOrEmail.module.css";

const InvalidPassOrEmailModal = ({ show, onClose }) => {
  const { t } = useTranslation();
  if (!show) {
    return null;
  }
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{t("invalidPassOrEmailModal.title")}</h2>
        <p>{t("invalidPassOrEmailModal.message")}</p>
        <button onClick={onClose} className={styles.closeButton}>
          {t("invalidPassOrEmailModal.closeButton")}
        </button>
      </div>
    </div>
  );
};

export default InvalidPassOrEmailModal;
