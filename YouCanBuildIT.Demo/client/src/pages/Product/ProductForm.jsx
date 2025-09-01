const ProductForm = ({ initialProduct, onSubmit, loading }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    ...initialProduct,
  });

  useEffect(() => {
    if (initialProduct) setProduct(initialProduct);
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2rem 0" }}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ProductForm;
