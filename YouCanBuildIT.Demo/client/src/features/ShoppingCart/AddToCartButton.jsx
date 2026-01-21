import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import styles from "../../assets/styles/addToCartButton.module.css";

const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AddToCartButton = ({
  productId,
  size = "normal",
  showQuantity = false,
  onAddSuccess,
  disabled: externalDisabled = false,
  initialQuantity = 1
}) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAdd = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await addToCart(productId, quantity);
      setAdded(true);
      if (onAddSuccess) {
        onAddSuccess();
      }
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const isDisabled = loading || externalDisabled;

  const buttonClassName = `${styles.button} ${size === "large" ? styles.buttonLarge : ""} ${added ? styles.buttonAdded : ""}`;

  return (
    <div className={styles.container}>
      {showQuantity && (
        <div className={styles.quantitySelector}>
          <span className={styles.quantityLabel}>Quantity:</span>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={handleQuantityChange}
            disabled={loading}
            className={styles.quantityInput}
          />
        </div>
      )}
      <button
        onClick={handleAdd}
        disabled={isDisabled}
        className={buttonClassName}
      >
        {loading ? (
          <>
            <span className={styles.loadingSpinner} />
            Adding...
          </>
        ) : added ? (
          <>
            <CheckIcon />
            Added!
          </>
        ) : (
          <>
            <CartIcon />
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

AddToCartButton.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.oneOf(["normal", "large"]),
  showQuantity: PropTypes.bool,
  onAddSuccess: PropTypes.func,
  disabled: PropTypes.bool,
  initialQuantity: PropTypes.number,
};

export default AddToCartButton;
