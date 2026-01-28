import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SecondHandForm from "./SecondHandForm";
import { createListing } from "../../api/secondHandListingService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/secondHandCreate.module.css";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const SecondHandCreate = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await createListing(formData);
      navigate(`/secondhand/${result.id}`);
    } catch (err) {
      console.error("Failed to create listing:", err);
      setError(err?.error || "Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/secondhand");
  };

  if (isLoading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.loginPrompt}>
            <h2>Login Required</h2>
            <p>You need to be logged in to create a listing.</p>
            <a className={styles.loginButton} href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
          Back
        </button>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <SecondHandForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SecondHandCreate;
