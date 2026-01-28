import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as newsService from "../../api/newsService";
import { CommentList } from "../../features/Comments";
import styles from "../../assets/styles/newsArticle.module.css";

export default function NewsArticle() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const data = await newsService.getNewsBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate("/news");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return <div className={styles.loading}>{t("loading", "Loading...")}</div>;
  }

  if (!article) {
    return (
      <div className={styles.loading}>
        {t("news.notFound", "Article not found")}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/news">{t("news.title", "News")}</Link> / {article.title}
      </div>

      <article className={styles.article}>
        {article.imageUrl && (
          <div
            className={styles.heroImage}
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
        )}

        <div className={styles.content}>
          <h1 className={styles.title}>{article.title}</h1>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <span>👤</span> {article.authorName}
            </span>
            <span className={styles.metaItem}>
              <span>📅</span>{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <span className={styles.metaItem}>
              <span>👁</span> {article.viewCount} {t("news.views", "views")}
            </span>
          </div>

          {article.tags?.length > 0 && (
            <div className={styles.tagList}>
              {article.tags.map((tag, i) => (
                <Link key={i} to={`/news/tag/${tag}`} className={styles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />

          {article.sourceUrl && (
            <a
              className={styles.sourceLink}
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 {t("news.readOriginal", "Read Original Source")}
            </a>
          )}
        </div>
      </article>

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>
          {t("news.comments", "Comments")}
        </h2>
        <CommentList entityType="News" entityId={article.id} />
      </div>
    </div>
  );
}
