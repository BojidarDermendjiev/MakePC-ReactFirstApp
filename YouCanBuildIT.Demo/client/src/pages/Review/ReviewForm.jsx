const ReviewForm = ({ initialData = {}, onSubmit, loading }) => {
  const [text, setText] = useState(initialData.text || "");
  const [rating, setRating] = useState(initialData.rating || 0);

  useEffect(() => {
    setText(initialData.text || "");
    setRating(initialData.rating || 0);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, rating });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review"
        required
      />
      <div>
        <label>Rating: </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default ReviewForm;
