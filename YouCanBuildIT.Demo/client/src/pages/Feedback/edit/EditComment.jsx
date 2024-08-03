import {  useEffect, useState } from "react";
import styles from "../../../assets/styles/comment.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { navigation } from "../../../context/common/navigations";
import Stars from "../Stars";
import { editComment, getCommentById } from "../../../API/comments";

const EditComment = () => {
  let { commentId } = useParams();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Edit comment
    await editComment(commentId, {comment, review: rating})

    setComment(""); // Reset comment input after submission
    setRating(0); // Reset rating after submission
    navigate(navigation.getFeedBackUrl());
  };

  useEffect(()=>{
    const initial = async () =>{
        const data = await getCommentById(commentId)
        setComment(data.comment)
        setRating(data.review)
    }
    initial()
  },[])

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

export default EditComment;
