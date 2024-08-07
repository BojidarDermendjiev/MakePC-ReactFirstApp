import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../assets/styles/userExistsModal.module.css";

const UserExistsModal = ({ show, onClose }) => {
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
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{t("userExistsModal.title")}</h2>
        <p>{t("userExistsModal.message")}</p>
        <button onClick={onClose} className={styles.closeButton}>
          {t("userExistsModal.closeButton")}
        </button>
      </div>
    </div>
  );
};

export default UserExistsModal;
