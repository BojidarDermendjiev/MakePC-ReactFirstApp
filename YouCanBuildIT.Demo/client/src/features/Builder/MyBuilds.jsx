import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider";
import * as buildService from "../../api/buildService";
import styles from "../../assets/styles/myBuilds.module.css";

export default function MyBuilds() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBuilds();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchBuilds = async () => {
    try {
      const data = await buildService.getMyBuilds();
      setBuilds(data || []);
    } catch (error) {
      console.error("Error fetching builds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        t(
          "builder.confirmDelete",
          "Are you sure you want to delete this build?",
        ),
      )
    ) {
      return;
    }

    try {
      await buildService.deleteBuild(id);
      setBuilds(builds.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting build:", error);
    }
  };

  const getComponentIcon = (type) => {
    const icons = {
      CPU: "🧠",
      Motherboard: "📟",
      RAM: "💾",
      GPU: "🎮",
      Storage: "💿",
      PSU: "⚡",
      Case: "🖥️",
      Cooler: "❄️",
    };
    return icons[type] || "🔧";
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginPrompt}>
          <h2>{t("builder.loginRequired", "Login Required")}</h2>
          <p>
            {t("builder.loginToView", "Please")}{" "}
            <Link to="/login">{t("builder.login", "log in")}</Link>{" "}
            {t("builder.toViewBuilds", "to view your saved builds.")}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t("loading", "Loading...")}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("builder.myBuilds", "My Builds")}</h1>
        <Link className={styles.newBuildButton} to="/builder">
          ➕ {t("builder.newBuild", "New Build")}
        </Link>
      </div>

      {builds.length > 0 ? (
        <div className={styles.buildGrid}>
          {builds.map((build) => (
            <div className={styles.buildCard} key={build.id}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{build.name}</h3>
                <span className={styles.cardPurpose}>{build.purpose}</span>
                {build.isPublic && (
                  <span className={styles.publicBadge}>
                    {t("builder.public", "Public")}
                  </span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <div
                      className={`${styles.statValue} ${styles.statValueBlue}`}
                    >
                      {build.totalPriceBgn?.toFixed(2)} лв.
                    </div>
                    <div className={styles.statLabel}>
                      {t("builder.totalPrice", "Total Price")}
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>
                      {build.componentCount || 0}
                    </div>
                    <div className={styles.statLabel}>
                      {t("builder.components", "Components")}
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div
                      className={`${styles.statValue} ${
                        build.isComplete
                          ? styles.statValueGreen
                          : styles.statValueOrange
                      }`}
                    >
                      {build.isComplete ? "✓" : "○"}
                    </div>
                    <div className={styles.statLabel}>
                      {build.isComplete
                        ? t("builder.complete", "Complete")
                        : t("builder.incomplete", "Incomplete")}
                    </div>
                  </div>
                </div>

                <div className={styles.componentPreview}>
                  {build.items?.slice(0, 6).map((item) => (
                    <span className={styles.componentBadge} key={item.id}>
                      {getComponentIcon(item.componentType)}{" "}
                      {item.componentType}
                    </span>
                  ))}
                  {build.items?.length > 6 && (
                    <span className={styles.componentBadge}>
                      +{build.items.length - 6}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Link
                  className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
                  to={`/builder/${build.id}`}
                >
                  {t("builder.edit", "Edit")}
                </Link>
                <Link
                  className={`${styles.cardButton} ${styles.cardButtonSecondary}`}
                  to={`/builder/compare/${build.id}`}
                >
                  {t("builder.compare", "Compare")}
                </Link>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(build.id)}
                >
                  {t("builder.delete", "Delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🖥️</div>
          <h2 className={styles.emptyTitle}>
            {t("builder.noBuilds", "No Builds Yet")}
          </h2>
          <p className={styles.emptyText}>
            {t(
              "builder.createFirst",
              "Create your first PC build to get started!",
            )}
          </p>
          <Link className={styles.newBuildButton} to="/builder">
            ➕ {t("builder.createBuild", "Create Build")}
          </Link>
        </div>
      )}
    </div>
  );
}
