import React from "react";

const ProductCard = ({ product }) => (
  <div>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <span>Price: ${product.price}</span>
  </div>
);

export default ProductCard;
