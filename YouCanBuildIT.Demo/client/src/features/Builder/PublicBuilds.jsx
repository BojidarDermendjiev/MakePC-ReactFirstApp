import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as buildService from "../../api/buildService";
import styles from "../../assets/styles/publicBuilds.module.css";

export default function PublicBuilds() {
  const { t } = useTranslation();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchBuilds();
  }, []);

  const fetchBuilds = async () => {
    try {
      const data = await buildService.getPublicBuilds(50);
      setBuilds(data || []);
    } catch (error) {
      console.error("Error fetching public builds:", error);
    } finally {
      setLoading(false);
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

  const filteredBuilds =
    filter === "all"
      ? builds
      : builds.filter((b) => b.purpose?.toLowerCase() === filter.toLowerCase());

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
        <h1 className={styles.title}>
          {t("builder.communityBuilds", "Community Builds")}
        </h1>
        <Link className={styles.newBuildButton} to="/builder">
          ➕ {t("builder.createYourOwn", "Create Your Own")}
        </Link>
      </div>

      <p className={styles.description}>
        {t(
          "builder.communityDescription",
          "Get inspired by builds from other PC enthusiasts. See what components they chose and use them as a starting point for your own build.",
        )}
      </p>

      <div className={styles.filterBar}>
        <button
          className={`${styles.filterButton} ${
            filter === "all" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("all")}
        >
          {t("builder.all", "All")}
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "gaming" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("gaming")}
        >
          🎮 {t("builder.gaming", "Gaming")}
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "office" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("office")}
        >
          💼 {t("builder.office", "Office")}
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "content creation" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("content creation")}
        >
          🎬 {t("builder.content", "Content Creation")}
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "workstation" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("workstation")}
        >
          🔧 {t("builder.workstation", "Workstation")}
        </button>
        <button
          className={`${styles.filterButton} ${
            filter === "budget" ? styles.filterButtonActive : ""
          }`}
          onClick={() => setFilter("budget")}
        >
          💰 {t("builder.budget", "Budget")}
        </button>
      </div>

      {filteredBuilds.length > 0 ? (
        <div className={styles.buildGrid}>
          {filteredBuilds.map((build) => (
            <Link
              className={styles.buildCard}
              key={build.id}
              to={`/builder/view/${build.id}`}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{build.name}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardPurpose}>{build.purpose}</span>
                  <span>👤 {build.userName}</span>
                </div>
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
                  {build.items?.slice(0, 4).map((item) => (
                    <span className={styles.componentBadge} key={item.id}>
                      {getComponentIcon(item.componentType)}{" "}
                      {item.componentType}
                    </span>
                  ))}
                  {build.items?.length > 4 && (
                    <span className={styles.componentBadge}>
                      +{build.items.length - 4}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.authorInfo}>
                  {new Date(build.createdAt).toLocaleDateString()}
                </span>
                <span className={styles.viewButton}>
                  {t("builder.viewBuild", "View Build")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🌐</div>
          <h2 className={styles.emptyTitle}>
            {t("builder.noPublicBuilds", "No Public Builds Yet")}
          </h2>
          <p className={styles.emptyText}>
            {t(
              "builder.beFirst",
              "Be the first to share a build with the community!",
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
