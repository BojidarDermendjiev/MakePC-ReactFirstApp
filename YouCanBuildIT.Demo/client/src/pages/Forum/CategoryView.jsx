import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/forumCategoryView.module.css";

export default function CategoryView() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [category, setCategory] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoryData = await forumService.getCategoryBySlug(slug);
        setCategory(categoryData);

        const threadsData = await forumService.getThreads({
          page,
          size: 20,
          categoryId: categoryData.id,
        });

        setThreads(threadsData.items || []);
        setTotalPages(threadsData.totalPages || 1);
      } catch (error) {
        console.error("Error fetching category:", error);
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, page, navigate]);

  if (loading) {
    return <div className={styles.loading}>{t("loading", "Loading...")}</div>;
  }

  if (!category) {
    return (
      <div className={styles.loading}>
        {t("forum.categoryNotFound", "Category not found")}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/forum">{t("forum.title", "Forum")}</Link> / {category.name}
      </div>

      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>{category.name}</h1>
          {category.description && (
            <p className={styles.description}>{category.description}</p>
          )}
        </div>

        {isAuthenticated && (
          <Link
            className={styles.createButton}
            to={`/forum/create?categoryId=${category.id}`}
          >
            {t("forum.createThread", "Create Thread")}
          </Link>
        )}
      </div>

      {threads.length === 0 ? (
        <div className={styles.emptyState}>
          {t("forum.noThreads", "No threads yet. Be the first to post!")}
        </div>
      ) : (
        <div className={styles.threadList}>
          {threads.map((thread) => {
            const cardClass = [
              styles.threadCard,
              thread.isPinned ? styles.threadCardPinned : "",
            ].join(" ");

            return (
              <Link
                key={thread.id}
                to={`/forum/thread/${thread.id}`}
                className={cardClass}
              >
                <div className={styles.threadInfo}>
                  <h4 className={styles.threadTitle}>
                    {thread.isPinned && "📌 "}
                    {thread.isLocked && "🔒 "}
                    {thread.title}
                  </h4>
                  <div className={styles.threadMeta}>
                    {t("forum.by", "by")} {thread.authorName} •{" "}
                    {new Date(thread.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className={styles.threadStats}>
                  <span className={styles.stat}>👁 {thread.viewCount}</span>
                  <span className={styles.stat}>💬 {thread.postCount}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            {t("pagination.prev", "Prev")}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${
                page === i + 1 ? styles.pageButtonActive : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={styles.pageButton}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            {t("pagination.next", "Next")}
          </button>
        </div>
      )}
    </div>
  );
}
