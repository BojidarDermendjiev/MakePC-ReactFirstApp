import styles from "../../assets/styles/userSettingsModal.module.css";

const PasswordModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Password Change Failed</h3>
        <p>{message || "An error occurred while changing your password."}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PasswordModal;
