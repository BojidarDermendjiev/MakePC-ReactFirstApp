import React from "react";
import styles from "../../assets/styles/userSettings.module.css";

const PasswordModal = ({ show, message, onClose }) => {
  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Password Change Error</h3>
        <div className={styles.error}>{message}</div>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
