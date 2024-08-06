import { useContext, useEffect, useState } from "react";
import styles from "../../../assets/styles/comment.module.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { navigation } from "../../../common/navigations";
import Stars from "../Stars";
import { editComment, getCommentById } from "../../../API/comments";
import { AuthContext } from "../../../context/AuthContextProvider";

const EditComment = () => {
  const { user } = useContext(AuthContext);
  let { commentId } = useParams();
  const location = useLocation();

  const [comment, setComment] = useState(location.state?.comment || "");
  const [rating, setRating] = useState(location.state?.review || 0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editComment(commentId, user, { comment, review: rating });
      setComment("");
      setRating(0);
      navigate(navigation.getFeedBackUrl());
    } catch (error) {
      setError("Failed to edit comment.");
    }
  };

  useEffect(() => {
    const initial = async () => {
      try {
        const data = await getCommentById(commentId);
        if (data && data.comment !== undefined && data.review !== undefined) {
          setComment(data.comment);
          setRating(data.review);
        } else {
          setError("Failed to load comment data.");
        }
      } catch (error) {
        setError("Failed to load comment data.");
      }
    };
    if (!location.state) {
      initial();
    }
  }, [commentId, location.state]);

  return (
    <div className={styles["comment-form-container"]}>
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <h2>Edit Comment</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles["form-group"]}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            className={styles["form-group"]}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Stars rating={rating} setRating={setRating} />
        <button type="submit" className={styles["btnSubmit"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditComment;
