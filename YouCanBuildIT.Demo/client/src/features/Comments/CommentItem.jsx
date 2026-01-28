import { useState } from "react";
import PropTypes from "prop-types";
import ReactionButtons from "./ReactionButtons";
import CommentForm from "./CommentForm";
import styles from "../../assets/styles/commentItem.module.css";

const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const CommentItem = ({
  comment,
  currentUserId,
  isAuthenticated,
  onReact,
  onReply,
  onEdit,
  onDelete,
  isReply = false,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = currentUserId === comment.authorId;
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReact = async (reactionType) => {
    await onReact(comment.id, reactionType);
  };

  const handleReply = async (content) => {
    await onReply(comment.id, content);
    setShowReplyForm(false);
  };

  const handleEdit = async (content) => {
    await onEdit(comment.id, content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await onDelete(comment.id);
    }
  };

  const containerClass = isReply
    ? `${styles.container} ${styles.containerReply}`
    : styles.container;

  return (
    <div className={containerClass}>
      <div className={styles.header}>
        <div className={styles.avatar}>{getInitials(comment.authorName)}</div>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>
            {comment.authorName}
            {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
              <span className={styles.editedBadge}>(edited)</span>
            )}
          </span>
          <span className={styles.timestamp}>
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>

      {isEditing ? (
        <div className={styles.replyFormContainer}>
          <CommentForm
            onSubmit={handleEdit}
            onCancel={() => setIsEditing(false)}
            initialValue={comment.bodyHtml}
            submitLabel="Save"
            compact
            isAuthenticated
          />
        </div>
      ) : (
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: comment.bodyHtml }}
        />
      )}

      {!isEditing && (
        <div className={styles.actions}>
          <ReactionButtons
            likeCount={comment.likeCount}
            dislikeCount={comment.dislikeCount}
            currentUserReaction={comment.currentUserReaction}
            onReact={handleReact}
            disabled={!isAuthenticated}
          />
          {isAuthenticated && !isReply && (
            <button
              className={styles.actionButton}
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <ReplyIcon />
              Reply
            </button>
          )}
          {isOwner && (
            <>
              <button
                className={styles.actionButton}
                onClick={() => setIsEditing(true)}
              >
                <EditIcon />
                Edit
              </button>
              <button className={styles.actionButton} onClick={handleDelete}>
                <DeleteIcon />
                Delete
              </button>
            </>
          )}
        </div>
      )}

      {showReplyForm && (
        <div className={styles.replyFormContainer}>
          <CommentForm
            onSubmit={handleReply}
            onCancel={() => setShowReplyForm(false)}
            placeholder={`Reply to ${comment.authorName}...`}
            submitLabel="Reply"
            compact
            isAuthenticated
          />
        </div>
      )}

      {hasReplies && (
        <>
          <button
            className={styles.showRepliesButton}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "reply" : "replies"}
          </button>
          {showReplies && (
            <div className={styles.repliesContainer}>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  isAuthenticated={isAuthenticated}
                  onReact={onReact}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isReply
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    bodyHtml: PropTypes.string.isRequired,
    likeCount: PropTypes.number,
    dislikeCount: PropTypes.number,
    currentUserReaction: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    replies: PropTypes.array,
  }).isRequired,
  currentUserId: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onReact: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isReply: PropTypes.bool,
};

export default CommentItem;
