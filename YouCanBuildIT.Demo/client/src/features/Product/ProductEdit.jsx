import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productService";
import ProductForm from "../../features/Product/ProductForm";
import { navigation } from "../../common/navigations";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
          setError(err?.message || "Product not found");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = useCallback(async (updatedProduct) => {
    setSubmitting(true);
    setError(null);
    try {
      await updateProduct(id, updatedProduct);
      navigate(navigation.getProductDetailsUrl(id));
    } catch (err) {
      setError(err?.message || "Failed to update product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [id, navigate]);

  const handleBack = useCallback(() => {
    navigate(navigation.getProductsUrl());
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading product...</div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="error-container" role="alert">
        <p className="error-message">{error}</p>
        <button onClick={handleBack}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-edit">
      <h1>Edit Product</h1>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        loading={submitting}
      />
      <button
        onClick={handleBack}
        disabled={submitting}
        className="cancel-button"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProductEdit;
