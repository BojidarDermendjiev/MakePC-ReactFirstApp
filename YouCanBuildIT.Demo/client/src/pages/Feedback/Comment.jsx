import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComment } from "../../API/comments";
import { navigation } from "../../common/navigations";
import styles from "../../assets/styles/comment.module.css";
import { AuthContext } from "../../context/AuthContextProvider";
import Stars from "./Stars";

const Comment = () => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(user._id, {
        comment,
        review: rating,
      });
      setComment("");
      setRating(0);
      navigate(navigation.getFeedBackUrl());
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
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
        <Stars rating={rating} setRating={setRating} />
        <button type="submit" className={styles["btnSumit"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Comment;
