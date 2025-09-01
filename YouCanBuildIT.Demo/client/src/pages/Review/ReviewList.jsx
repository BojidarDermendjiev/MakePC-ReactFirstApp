
import reviewService from "../../API/reviewService";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    reviewService
      .getReviewsByProductId(productId)
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews yet.</div>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <strong>{review.userName || "Anonymous"}:</strong>
          <span> {review.text}</span>
          <span> {review.rating && `Rating: ${review.rating}`}</span>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
