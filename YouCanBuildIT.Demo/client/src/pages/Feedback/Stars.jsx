import styles from "../../assets/styles/comment.module.css";

export default function Stars({ rating, setRating }) {
  return (
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
            <span className={styles.star}>&#9733;</span> {/* Star character */}
          </button>
        );
      })}
    </div>
  );
}
