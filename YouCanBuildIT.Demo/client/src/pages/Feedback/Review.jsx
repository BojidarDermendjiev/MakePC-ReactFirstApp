import styles from "../../assets/styles/feedback.module.css";
import { deleteComment } from "../../API/feedbackService";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../common/navigations";
import Stars from "./Stars";

export default function Review({
  loggedInUser,
  userId,
  userName,
  comment,
  rating,
  commentId,
  triggerRefreshHandler,
}) {
  const navigate = useNavigate();
  const isOwner = loggedInUser && loggedInUser.id === userId;

  const deleteHandler = async () => {
    await deleteComment(commentId);
    triggerRefreshHandler();
  };

  const editComment = () => {
    navigate(`${navigation.getCommentFromUrl()}/${commentId}`, {
      state: { comment, rating },
    });
  };

  return (
    <div className={styles.card}>
      <p className={styles.content}>{userName}</p>
      <p className={styles.content}>{comment}</p>
      <Stars rating={rating} setRating={() => {}} />
      {isOwner && (
        <>
          <button className={styles.btnEdit} onClick={editComment}>
            Edit
          </button>
          <button className={styles.btnDelete} onClick={deleteHandler}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
