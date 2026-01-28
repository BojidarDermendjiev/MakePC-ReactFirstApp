import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as newsService from "../../api/newsService";
import styles from "../../assets/styles/newsHome.module.css";

export default function NewsHome() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await newsService.getNews({ page, size: 12 });
        setNews(data.items || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [page]);

  if (loading) {
    return <div className={styles.loading}>{t("loading", "Loading...")}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("news.title", "Hardware News")}</h1>
        <p className={styles.subtitle}>
          {t("news.subtitle", "Latest updates from the tech world")}
        </p>
      </div>

      {news.length === 0 ? (
        <div className={styles.emptyState}>
          {t("news.noNews", "No news articles yet")}
        </div>
      ) : (
        <div className={styles.newsGrid}>
          {news.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.slug}`}
              className={styles.newsCard}
            >
              <div
                className={styles.newsImage}
                style={{
                  backgroundImage: article.imageUrl
                    ? `url(${article.imageUrl})`
                    : undefined,
                }}
              >
                {!article.imageUrl && "📰"}
              </div>
              <div className={styles.newsContent}>
                {article.tags?.length > 0 && (
                  <div className={styles.tagList}>
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className={styles.newsTitle}>{article.title}</h3>
                <p className={styles.newsSummary}>{article.summary}</p>
                <div className={styles.newsMeta}>
                  <span>{article.authorName}</span>
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
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
          {[...Array(Math.min(totalPages, 5))].map((_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${page === i + 1 ? styles.pageButtonActive : ""}`}
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
