import PropTypes from "prop-types";

const ProductCard = ({ product }) => (
  <div>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <span>Price: ${product.price}</span>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
