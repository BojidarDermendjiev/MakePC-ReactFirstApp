import React from "react";
import styles from "../../assets/styles/errorLoading.module.css";

const ErrorLoading = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Error Loading Comments</h1>
      <p className={styles.errorMessage}>
        There was an error loading the comments. Please try again later.
      </p>
    </div>
  );
};

export default ErrorLoading;
