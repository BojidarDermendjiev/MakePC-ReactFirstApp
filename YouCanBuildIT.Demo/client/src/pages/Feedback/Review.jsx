import React from "react";
import styles from "../../assets/styles/feedback.module.css";

export default function Review({
  name,
  password,
  icon,
  email,
  feedback,
  loggedInUser,
}) {
  const isOwner = loggedInUser && loggedInUser.email === email;
  return (
    <div className={styles.card}>
      <img src={icon} alt="user" />
      <p className={styles.name}>{name}</p>
      <p className={styles.content}>{email}</p>
      <p className={styles.content}>{feedback.comment}</p>
      {isOwner && (
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      )}
    </div>
  );
}
