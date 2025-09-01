import styles from "../../assets/styles/feedback.module.css";
import { deleteComment } from "../../api/feedbackService";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../common/navigations";
import Stars from "./Stars";
import { serverOrigin } from "../../common/generic";
const defaultAvatar = "/img/image.png";

export default function Review({
  loggedInUser,
  userId,
  userName,
  comment,
  rating,
  commentId,
  avatarUrl,
  triggerRefreshHandler,
}) {
  const navigate = useNavigate();
  const isOwner = loggedInUser && loggedInUser.id === userId;

  const imgSrc = avatarUrl
    ? avatarUrl.startsWith("http")
      ? avatarUrl
      : avatarUrl.startsWith("/uploads/avatars/")
        ? `${serverOrigin}${avatarUrl}`
        : avatarUrl.startsWith("/")
          ? avatarUrl
          : `/${avatarUrl}`
    : defaultAvatar;

  const editComment = () => {
    navigate(`${navigation.getCommentFromUrl()}/${commentId}`, {
      state: { comment, rating },
    });
  };

  const deleteHandler = async () => {
    await deleteComment(commentId);
    triggerRefreshHandler();
  };

  return (
    <div className={styles.card}>
      <p>
        <img src={imgSrc} alt="avatar" />
      </p>
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
