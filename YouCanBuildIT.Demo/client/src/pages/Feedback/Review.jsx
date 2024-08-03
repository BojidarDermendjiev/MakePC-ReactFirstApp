import styles from "../../assets/styles/feedback.module.css";
import { deleteComment } from "../../API/comments";
import { useNavigate } from "react-router-dom";
import { navigation } from "../../context/common/navigations";

export default function Review({loggedInUser, email, comment, review, _id, triggerRefreshHandler}) {
  const navigate = useNavigate()

  const isOwner = loggedInUser && loggedInUser.email === email;

  const deleteHandler = async () =>{ 
    await deleteComment(_id)
    triggerRefreshHandler()
  }

  const editComment = async () => {
    navigate(`${navigation.getCommentFromUrl()}/${_id}`)
  }
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
