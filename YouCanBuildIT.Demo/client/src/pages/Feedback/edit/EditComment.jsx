import { useContext, useEffect, useState } from "react";
import styles from "../../../assets/styles/comment.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { navigation } from "../../../common/navigations";
import Stars from "../Stars";
import { editComment, getCommentById } from "../../../API/comments";
import { AuthContext } from "../../../context/AuthContextProvider";

const EditComment = () => {
  const { user } = useContext(AuthContext);
  let { commentId } = useParams();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
    await editComment(commentId, user, { comment, review: rating });

    setComment("");
    setRating(0);
    navigate(navigation.getFeedBackUrl());
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
    initial();
  }, [commentId]);

  return (
    <div className={styles["comment-form-container"]}>
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <h2>Edit Comment</h2>
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
