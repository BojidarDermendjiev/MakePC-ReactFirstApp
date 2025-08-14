import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../API/productService";
import ReviewList from "../../pages/Review/ReviewList";
import ReviewCrudPage from "../Review/ReviewCrudPage";
import { navigation } from "../../common/navigations";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate(navigation.getProductsUrl())}>
        Back to Products
      </button>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span>Price: ${product.price}</span>

      <hr />

      <h2>Reviews</h2>
      <ReviewList productId={product.id} />

      <h3>Write a Review</h3>
      <ReviewCrudPage productId={product.id} />
    </div>
  );
};

export default ProductDetails;
