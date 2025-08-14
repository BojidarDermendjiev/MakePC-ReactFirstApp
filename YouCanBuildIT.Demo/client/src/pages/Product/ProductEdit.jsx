import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../API/productService";
import ProductForm from "../../pages/Product/ProductForm";
import { navigation } from "../../common/navigations";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => alert("Product not found"));
  }, [id]);

  const handleSubmit = async (updatedProduct) => {
    setLoading(true);
    try {
      await updateProduct(id, updatedProduct);
      navigate(navigation.getProductDetailsUrl(id));
    } catch (err) {
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm
        initialProduct={product}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default ProductEdit;
