import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../assets/styles/reactionButtons.module.css";

const ThumbUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
  </svg>
);

const ThumbDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
  </svg>
);

export const ReactionButtons = ({
  likeCount = 0,
  dislikeCount = 0,
  currentUserReaction,
  onReact,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  const handleReact = async (type) => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      const newReaction = currentUserReaction === type ? null : type;
      await onReact(newReaction);
    } finally {
      setLoading(false);
    }
  };

  const isLiked = currentUserReaction === "Like";
  const isDisliked = currentUserReaction === "Dislike";

  const likeBtnClass = [
    styles.button,
    styles.like,
    isLiked ? styles.activeLike : "",
  ].join(" ");

  const dislikeBtnClass = [
    styles.button,
    styles.dislike,
    isDisliked ? styles.activeDislike : "",
  ].join(" ");

  return (
    <div className={styles.container}>
      <button
        className={likeBtnClass}
        onClick={() => handleReact("Like")}
        disabled={loading || disabled}
        title={isLiked ? "Remove like" : "Like"}
      >
        <ThumbUpIcon />
        <span className={styles.count}>{likeCount}</span>
      </button>

      <button
        className={dislikeBtnClass}
        onClick={() => handleReact("Dislike")}
        disabled={loading || disabled}
        title={isDisliked ? "Remove dislike" : "Dislike"}
      >
        <ThumbDownIcon />
        <span className={styles.count}>{dislikeCount}</span>
      </button>
    </div>
  );
};

ReactionButtons.propTypes = {
  likeCount: PropTypes.number,
  dislikeCount: PropTypes.number,
  currentUserReaction: PropTypes.oneOf(["Like", "Dislike", null]),
  onReact: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ReactionButtons;
