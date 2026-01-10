import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productService";
import ProductForm from "../../features/Product/ProductForm";
import { navigation } from "../../common/navigations";

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      await createProduct(productData);
      navigate(navigation.getProductsUrl());
    } catch (err) {
      setError(err?.message || "Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleCancel = useCallback(() => {
    navigate(navigation.getProductsUrl());
  }, [navigate]);

  return (
    <div className="product-create">
      <h1>Create Product</h1>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      <ProductForm onSubmit={handleSubmit} loading={loading} />
      <button
        onClick={handleCancel}
        disabled={loading}
        className="cancel-button"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProductCreate;
