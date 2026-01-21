import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import styles from "../../assets/styles/shoppingCart.module.css";

const ShoppingCart = () => {
  const { user } = useContext(AuthContext);
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;
    try {
      await clearCart();
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.loginMessage}>
          <h2>Please log in</h2>
          <p>You need to be logged in to view your shopping cart.</p>
          <Link to="/login" className={styles.loginButton}>Log In</Link>
        </div>
      </div>
    );
  }

  if (loading && !cart) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Loading your cart...</div>
      </div>
    );
  }

  const items = cart?.items || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
        </div>
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Looks like you have not added any items to your cart yet.</p>
          <Link to="/products" className={styles.shopButton}>Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <span className={styles.itemCount}>
          {itemCount} item{itemCount !== 1 ? "s" : ""} in cart
        </span>
      </div>

      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.productId} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img
                  src={item.imageUrl || "/placeholder-product.png"}
                  alt={item.productName}
                  onError={(e) => {
                    e.target.src = "/placeholder-product.png";
                  }}
                />
              </div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>
                  <Link to={`/products/${item.productId}`}>{item.productName}</Link>
                </h3>
                <span className={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</span>
                <span className={styles.itemSubtotal}>
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </span>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1 || loading}
                  >
                    -
                  </button>
                  <span className={styles.quantityDisplay}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.productId)}
                    disabled={loading}
                  >
                    {loading ? "..." : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping === 0 && (
            <div className={`${styles.summaryRow} ${styles.freeShippingNote}`}>
              <span>Free shipping on orders over $100!</span>
            </div>
          )}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className={styles.clearCartButton} onClick={handleClearCart}>
            Clear Cart
          </button>
          <Link to="/products" className={styles.continueShoppingLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
