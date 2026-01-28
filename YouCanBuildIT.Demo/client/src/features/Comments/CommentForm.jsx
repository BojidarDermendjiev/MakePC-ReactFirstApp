import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../assets/styles/commentForm.module.css";

export const CommentForm = ({
  onSubmit,
  onCancel,
  initialValue = "",
  placeholder = "Write a comment...",
  submitLabel = "Post Comment",
  compact = false,
  isAuthenticated = false,
}) => {
  const [content, setContent] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    try {
      await onSubmit(content.trim());
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPrompt}>
        Please <a href="/login">sign in</a> to leave a comment.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={`${styles.textArea} ${compact ? styles.textAreaCompact : ""}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
      />
      <div className={styles.buttonRow}>
        {onCancel && (
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
          disabled={!content.trim() || loading}
        >
          {loading ? "Posting..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string,
  compact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default CommentForm;
