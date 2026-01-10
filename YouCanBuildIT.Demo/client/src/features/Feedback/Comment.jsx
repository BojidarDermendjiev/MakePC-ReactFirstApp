import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../api/feedbackService";
import { navigation } from "../../common/navigations";
import styles from "../../assets/styles/comment.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import Stars from "../../components/Stars";

const Comment = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");

    if (comment.length < 3) {
      setError("Comment is too short (minimum 3 characters).");
      return;
    }

    if (!user?.id) {
      setError("You must be logged in to leave a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment(user.id, {
        comment,
        rating,
      });
      setComment("");
      setRating(1);
      navigate(navigation.getFeedBackUrl());
    } catch (err) {
      if (err?.errors) {
        setError(Object.values(err.errors).flat().join(" "));
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Failed to create comment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [comment, rating, user?.id, navigate]);

  const handleCommentChange = useCallback((e) => {
    setComment(e.target.value);
    if (error) setError("");
  }, [error]);

  return (
    <div className={styles["comment-form-container"]}>
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <h2>Leave a Comment</h2>
        {error && (
          <div className={styles["error-message"]} role="alert">
            {error}
          </div>
        )}
        <div className={styles["form-group"]}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            className={styles["form-group"]}
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
            aria-describedby={error ? "comment-error" : undefined}
          />
        </div>
        <Stars rating={rating} setRating={setRating} />
        <button
          type="submit"
          className={styles["btnSumitFeedback"]}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Comment;
