import React, { useContext, useState } from "react";
import styles from "../../assets/styles/comment.module.css";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Comment() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  console.log(rating);
  return (
    <div className={styles["comment-form-container"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          rows="4"
          value={comment}
          onChange={handleCommentChange}
          required
        ></textarea>
      </div>
      <div className={styles["form-group"]}>
        <label>Rating</label>
        <div className={styles["rating"]}>
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={`star${index + 1}`}
                name="rating"
                value={index + 1}
                checked={rating == index + 1}
                onChange={handleRatingChange}
              />
              <label htmlFor={`star${index + 1}`} title={`${index + 1} stars`}>
                ★
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <button type="submit" className={styles["btnSumit"]}>
        Apply
      </button>
    </div>
  );
}
