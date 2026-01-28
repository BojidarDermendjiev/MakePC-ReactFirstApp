import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as forumService from "../../api/forumService";
import { AuthContext } from "../../context/AuthContextProvider";
import styles from "../../assets/styles/forumThreadView.module.css";

export default function ThreadView() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useContext(AuthContext);

  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true);
      try {
        const threadData = await forumService.getThreadById(id);
        setThread(threadData);
        setPosts(threadData.posts || []);
      } catch (error) {
        console.error("Error fetching thread:", error);
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [id, navigate]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      const newPost = await forumService.createPost({
        threadId: id,
        bodyHtml: replyText,
      });
      setPosts((prev) => [...prev, newPost]);
      setReplyText("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(t("forum.errorCreatingPost", "Error creating post"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (
      !window.confirm(
        t(
          "forum.confirmDeletePost",
          "Are you sure you want to delete this post?",
        ),
      )
    ) {
      return;
    }

    try {
      await forumService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(t("forum.errorDeletingPost", "Error deleting post"));
    }
  };

  if (loading) {
    return <div className={styles.loading}>{t("loading", "Loading...")}</div>;
  }

  if (!thread) {
    return (
      <div className={styles.loading}>
        {t("forum.threadNotFound", "Thread not found")}
      </div>
    );
  }

  const categorySlug =
    thread.categoryName?.toLowerCase().replace(/\s+/g, "-") || "";

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/forum">{t("forum.title", "Forum")}</Link> /{" "}
        <Link to={`/forum/category/${categorySlug}`}>
          {thread.categoryName}
        </Link>{" "}
        / {thread.title}
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>
          {thread.isPinned && (
            <span className={`${styles.badge} ${styles.badgePinned}`}>
              {t("forum.pinned", "Pinned")}
            </span>
          )}{" "}
          {thread.isLocked && (
            <span className={`${styles.badge} ${styles.badgeLocked}`}>
              {t("forum.locked", "Locked")}
            </span>
          )}{" "}
          {thread.title}
        </h1>

        <div className={styles.threadMeta}>
          <span>
            {t("forum.by", "by")} {thread.authorName}
          </span>
          <span>{new Date(thread.createdAt).toLocaleString()}</span>
          <span>
            👁 {thread.viewCount} {t("forum.views", "views")}
          </span>
        </div>
      </div>

      <div className={styles.postList}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <div className={styles.postHeader}>
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>
                  {post.authorName?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.authorText}>
                  <span className={styles.authorName}>{post.authorName}</span>
                </div>
              </div>
              <span className={styles.postDate}>
                {new Date(post.createdAt).toLocaleString()}
                {post.isEdited && ` (${t("forum.edited", "edited")})`}
              </span>
            </div>

            <div
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />

            {isAuthenticated &&
              post.authorId === userId &&
              !thread.isLocked && (
                <div className={styles.postActions}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    {t("forum.delete", "Delete")}
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>

      {thread.isLocked ? (
        <div className={styles.lockedNotice}>
          {t(
            "forum.threadLocked",
            "This thread is locked. No new replies can be posted.",
          )}
        </div>
      ) : isAuthenticated ? (
        <div className={styles.replySection}>
          <h3 className={styles.replyTitle}>
            {t("forum.postReply", "Post a Reply")}
          </h3>
          <form onSubmit={handleSubmitReply}>
            <textarea
              className={styles.replyTextarea}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t(
                "forum.replyPlaceholder",
                "Write your reply here...",
              )}
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={submitting || !replyText.trim()}
            >
              {submitting
                ? t("forum.posting", "Posting...")
                : t("forum.postReply", "Post Reply")}
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.loginPrompt}>
          <Link to="/login">
            {t("forum.loginToReply", "Log in to reply to this thread")}
          </Link>
        </div>
      )}
    </div>
  );
}
