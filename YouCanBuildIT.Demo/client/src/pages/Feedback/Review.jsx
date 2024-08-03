import styles from "../../assets/styles/feedback.module.css";
import { deleteComment } from "../../API/comments";

export default function Review({loggedInUser, email, comment, review, _id, triggerRefreshHandler}) {
  const isOwner = loggedInUser && loggedInUser.email === email;

  const deleteHandler = async () =>{ 
    await deleteComment(_id)
    triggerRefreshHandler()
  }

  return (
    <div className={styles.card}>
      <p className={styles.content}>{email}</p>
      <p className={styles.content}>{comment}</p>
      <p className={styles.content}>{review} stars</p>

      {isOwner && (
        <>
          <button>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </>
      )}
    </div>
  );
}
