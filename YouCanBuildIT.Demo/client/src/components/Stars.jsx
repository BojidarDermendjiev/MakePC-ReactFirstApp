import PropTypes from "prop-types";
import styles from "../assets/styles/comment.module.css";

export default function Stars({ rating = 0, setRating }) {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <button
            type="button"
            key={starNumber}
            className={
              starNumber <= rating
                ? styles["star-button"]
                : styles["star-button-blank"]
            }
            onClick={() => setRating && setRating(starNumber)}
            aria-label={`Set rating to ${starNumber}`}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

Stars.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
};
