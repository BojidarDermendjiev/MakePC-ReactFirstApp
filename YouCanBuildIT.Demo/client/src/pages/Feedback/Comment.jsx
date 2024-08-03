import { useContext, useState } from "react";
import styles from "../../assets/styles/comment.module.css";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Comment() {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

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
      <button type="submit">Apply</button>
    </div>
  );
}
