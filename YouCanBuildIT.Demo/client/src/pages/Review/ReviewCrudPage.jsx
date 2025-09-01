
import { useParams, useNavigate } from "react-router-dom";
import reviewService from "../../API/reviewService";
import ReviewForm from "../../pages/Review/ReviewForm";
import { AuthContext } from "../../context/AuthContextProvider";
import { navigation } from "../../common/navigations";

const ReviewCrudPage = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState({});

  useEffect(() => {
    if (reviewId) {
      setLoading(true);
      reviewService
        .getReviewById(reviewId)
        .then(setInitial)
        .finally(() => setLoading(false));
    }
  }, [reviewId]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      if (reviewId) {
        await reviewService.updateReview(reviewId, {
          ...data,
          userId: user.id,
          productId,
        });
      } else {
        await reviewService.createReview({
          ...data,
          userId: user.id,
          productId,
        });
      }
      navigate(navigation.getProductDetailsUrl(productId));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this review?")) {
      await reviewService.deleteReview(reviewId);
      navigate(navigation.getProductDetailsUrl(productId));
    }
  };

  return (
    <div>
      <h1>{reviewId ? "Edit Review" : "Write a Review"}</h1>
      <ReviewForm
        initialData={initial}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {reviewId && <button onClick={handleDelete}>Delete Review</button>}
    </div>
  );
};

export default ReviewCrudPage;
