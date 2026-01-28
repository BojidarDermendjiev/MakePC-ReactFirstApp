import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import commentService from "../../api/commentService";
import styles from "../../assets/styles/commentList.module.css";

const CommentSkeleton = () => (
  <div className={styles.skeletonComment}>
    <div className={styles.skeletonHeader}>
      <div className={styles.skeletonAvatar} />
      <div>
        <div
          className={styles.skeletonText}
          style={{ width: "120px", height: "14px", marginBottom: "4px" }}
        />
        <div
          className={styles.skeletonText}
          style={{ width: "80px", height: "12px" }}
        />
      </div>
    </div>
    <div className={styles.skeletonBody}>
      <div className={styles.skeletonText} />
      <div className={styles.skeletonText} style={{ width: "80%" }} />
      <div className={styles.skeletonText} style={{ width: "60%" }} />
    </div>
  </div>
);

export const CommentList = ({
  entityType,
  entityId,
  currentUserId,
  isAuthenticated = false,
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchComments = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        if (pageNum === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);

        const response = await commentService.getCommentsByEntity(
          entityType,
          entityId,
          pageNum,
          20,
        );

        if (append) {
          setComments((prev) => [...prev, ...response.comments]);
        } else {
          setComments(response.comments);
        }
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setPage(pageNum);
      } catch (err) {
        setError("Failed to load comments. Please try again.");
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [entityType, entityId],
  );

  useEffect(() => {
    fetchComments(1);
  }, [fetchComments]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchComments(page + 1, true);
    }
  };

  const handleCreate = async (content) => {
    try {
      const newComment = await commentService.createComment({
        entityType,
        entityId,
        bodyHtml: content,
      });
      setComments((prev) => [newComment, ...prev]);
      setTotalCount((prev) => prev + 1);
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      throw err;
    }
  };

  const handleReply = async (parentId, content) => {
    try {
      const reply = await commentService.createComment({
        entityType,
        entityId,
        parentId,
        bodyHtml: content,
      });

      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        }),
      );
    } catch (err) {
      setError("Failed to post reply. Please try again.");
      throw err;
    }
  };

  const handleEdit = async (commentId, content) => {
    try {
      const updated = await commentService.updateComment(commentId, {
        bodyHtml: content,
      });

      const updateComment = (list) =>
        list.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, ...updated };
          }
          if (comment.replies) {
            return { ...comment, replies: updateComment(comment.replies) };
          }
          return comment;
        });

      setComments(updateComment);
    } catch (err) {
      setError("Failed to update comment. Please try again.");
      throw err;
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);

      const removeComment = (list) =>
        list
          .filter((comment) => comment.id !== commentId)
          .map((comment) => ({
            ...comment,
            replies: comment.replies ? removeComment(comment.replies) : [],
          }));

      setComments(removeComment);
      setTotalCount((prev) => prev - 1);
    } catch (err) {
      setError("Failed to delete comment. Please try again.");
      throw err;
    }
  };

  const handleReact = async (commentId, reactionType) => {
    try {
      const updated = await commentService.reactToComment(
        commentId,
        reactionType,
      );

      const updateReaction = (list) =>
        list.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likeCount: updated.likeCount,
              dislikeCount: updated.dislikeCount,
              currentUserReaction: updated.currentUserReaction,
            };
          }
          if (comment.replies) {
            return { ...comment, replies: updateReaction(comment.replies) };
          }
          return comment;
        });

      setComments(updateReaction);
    } catch (err) {
      setError("Failed to react. Please try again.");
      throw err;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Comments</h3>
        </div>
        {[1, 2, 3].map((i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          Comments
          {totalCount > 0 && <span className={styles.count}>{totalCount}</span>}
        </h3>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.formContainer}>
        <CommentForm
          onSubmit={handleCreate}
          placeholder="Share your thoughts..."
          isAuthenticated={isAuthenticated}
        />
      </div>

      <div className={styles.commentsContainer}>
        {comments.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>💬</div>
            <p className={styles.emptyText}>
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              onReact={handleReact}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {page < totalPages && (
        <button
          className={styles.loadMoreButton}
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore
            ? "Loading..."
            : `Load more comments (${totalCount - comments.length} remaining)`}
        </button>
      )}
    </div>
  );
};

CommentList.propTypes = {
  entityType: PropTypes.string.isRequired,
  entityId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

export default CommentList;
