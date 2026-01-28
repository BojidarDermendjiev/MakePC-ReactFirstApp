import { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { handleOAuthResponse, verifySession } from "../../api/authentication";
import { navigation } from "../../common/navigations";
import styles from "../../assets/styles/oauthCallback.module.css";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus("verifying");

        // Small delay to ensure cookies are set
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verify session to get user data (this will use the HTTP-only cookie)
        const userData = await verifySession();

        if (userData) {
          handleOAuthResponse({ user: userData }, setUser);
          setStatus("success");

          // Redirect to home page after successful login
          setTimeout(() => {
            navigate(navigation.getHomeUrl(), { replace: true });
          }, 1000);
        } else {
          throw new Error("Failed to verify authentication session");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(err.message || "Authentication failed. Please try again.");
        setStatus("error");
      }
    };

    handleCallback();
  }, [navigate, setUser, searchParams]);

  const handleRetry = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === "processing" || status === "verifying" ? (
          <>
            <div className={styles.spinner} />
            <h2 className={styles.title}>
              {status === "processing" ? "Processing..." : "Verifying..."}
            </h2>
            <p className={styles.message}>
              {status === "processing"
                ? "Completing authentication..."
                : "Verifying your account..."}
            </p>
          </>
        ) : status === "success" ? (
          <>
            <h2 className={styles.title}>Success!</h2>
            <p className={styles.message}>
              You have been logged in successfully. Redirecting...
            </p>
          </>
        ) : (
          <>
            <h2 className={styles.title}>Authentication Failed</h2>
            <p className={styles.message}>
              We couldn&apos;t complete your sign-in. Please try again.
            </p>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button className={styles.retryButton} onClick={handleRetry}>
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
