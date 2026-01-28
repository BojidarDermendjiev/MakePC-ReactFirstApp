import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import styles from "../../assets/styles/forumHome.module.css";

export default function ForumHome() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, threadsRes] = await Promise.all([
          forumService.getCategories(),
          forumService.getThreads({ page: 1, size: 10 }),
        ]);
        setCategories(categoriesRes || []);
        setRecentThreads(threadsRes.items || []);
      } catch (error) {
        console.error("Error fetching forum data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>{t("loading", "Loading...")}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("forum.title", "Forum")}</h1>
      </div>

      <div className={styles.categoryList}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/forum/category/${category.slug}`}
            className={styles.categoryCard}
          >
            <div className={styles.categoryInfo}>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            </div>
            <div className={styles.categoryStats}>
              <div>
                {category.threadCount} {t("forum.threads", "threads")}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.recentThreads}>
        <h2 className={styles.sectionTitle}>
          {t("forum.recentThreads", "Recent Threads")}
        </h2>
        <div className={styles.threadList}>
          {recentThreads.map((thread) => (
            <Link
              key={thread.id}
              to={`/forum/thread/${thread.id}`}
              className={styles.threadCard}
            >
              <div className={styles.threadInfo}>
                <h4 className={styles.threadTitle}>
                  {thread.isPinned && "📌 "}
                  {thread.isLocked && "🔒 "}
                  {thread.title}
                </h4>
                <div className={styles.threadMeta}>
                  {t("forum.by", "by")} {thread.authorName} •{" "}
                  {thread.categoryName}
                </div>
              </div>
              <div className={styles.threadStats}>
                <span className={styles.stat}>👁 {thread.viewCount}</span>
                <span className={styles.stat}>💬 {thread.postCount}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
