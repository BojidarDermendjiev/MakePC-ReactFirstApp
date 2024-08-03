import React from "react";
import styles from "../../assets/styles/feedback.module.css";

export default function Review({loggedInUser, email, comment, review}) {
  const isOwner = loggedInUser && loggedInUser.email === email;
  return (
    <div className={styles.card}>
      <p className={styles.content}>{email}</p>
      <p className={styles.content}>{comment}</p>
      <p className={styles.content}>{review} stars</p>

      {isOwner && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
}
