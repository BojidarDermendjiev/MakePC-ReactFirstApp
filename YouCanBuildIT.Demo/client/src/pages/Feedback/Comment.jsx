import React, { useContext, useState } from "react";
import styles from "../../assets/styles/comment.module.css";
import { createComment } from "../../API/comments";
import { AuthContext } from "../../context/AuthContextProvider";

const Comment = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment(user, {
      comment,
      review: rating,
    });
    setComment(""); // Reset comment input after submission
    setRating(0); // Reset rating after submission
  };

  return (
    <div className={styles["comment-form-container"]}>
      <form className={styles["comment-form"]} onSubmit={handleSubmit}>
        <h2>Leave a Comment</h2>
        <div className={styles["form-group"]}>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            className={styles["form-group"]}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className={styles.rating}>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={
                  index <= rating
                    ? styles["star-button"]
                    : styles["star-button-blank"]
                }
                onClick={() => setRating(index)}
              >
                <span className={styles.star}>&#9733;</span>{" "}
                {/* Star character */}
              </button>
            );
          })}
        </div>
        <button type="submit" className={styles["btnSumit"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
