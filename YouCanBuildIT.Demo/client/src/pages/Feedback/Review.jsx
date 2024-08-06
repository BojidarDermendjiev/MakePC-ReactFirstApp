import styles from "../../assets/styles/feedback.module.css";
import { deleteComment } from "../../API/comments";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../common/navigations";

export default function Review({
  loggedInUser,
  email,
  comment,
  review,
  _id: userId,
  commentId,
  triggerRefreshHandler,
}) {
  const navigate = useNavigate();

  const isOwner = loggedInUser && loggedInUser.email === email;

  const deleteHandler = async () => {
    await deleteComment(userId, commentId);
    triggerRefreshHandler();
  };

  const editComment = () => {
    navigate(`${navigation.getCommentFromUrl()}/${commentId}`, {
      state: { comment, review },
    });
  };

  return (
    <div className={styles.card}>
      <p className={styles.content}>{email}</p>
      <p className={styles.content}>{comment}</p>
      <p className={styles.content}>{review} stars</p>

      {isOwner && (
        <>
          <button onClick={editComment}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </div>
  );
}
