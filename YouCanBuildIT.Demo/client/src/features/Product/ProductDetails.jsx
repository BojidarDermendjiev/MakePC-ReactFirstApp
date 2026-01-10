import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productService";
import ReviewList from "../../features/Review/ReviewList";
import ReviewCrudPage from "../Review/ReviewCrudPage";
import { navigation } from "../../common/navigations";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Failed to load product");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = useCallback(() => {
    navigate(navigation.getProductsUrl());
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" aria-label="Loading product details">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <p className="error-message">{error}</p>
        <button onClick={handleBack}>Back to Products</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <p>Product not found</p>
        <button onClick={handleBack}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <button onClick={handleBack} className="back-button">
        Back to Products
      </button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="product-price">Price: ${product.price}</span>

      <hr />

      <section className="reviews-section">
        <h2>Reviews</h2>
        <ReviewList productId={product.id} />

        <h3>Write a Review</h3>
        <ReviewCrudPage productId={product.id} />
      </section>
    </div>
  );
};

export default ProductDetails;
