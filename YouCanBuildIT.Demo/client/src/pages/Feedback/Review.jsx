import React from "react";
import styles from "../../assets/styles/feedback.module.css";

export default function Review({ loggedInUser, email, comment, name }) {
  const isOwner = loggedInUser && loggedInUser.email === email;
  return (
    <div className={styles.card}>
      <p className={styles.name}>{name}</p>
      <p className={styles.content}>{email}</p>
      <p className={styles.content}>{comment}</p>
      {isOwner && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
}
