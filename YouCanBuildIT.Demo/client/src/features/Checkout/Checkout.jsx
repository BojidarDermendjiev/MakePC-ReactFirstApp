import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import shoppingCartService from "../../api/shoppingCartService.js";
import orderService from "../../api/orderService.js";
import { AuthContext } from "../../context/AuthContextProvider";
import { navigation } from "../../common/navigations";
import { TURNSTILE_SITE_KEY, TURNSTILE_THEME } from "../../config/turnstile";
import styles from "../../assets/styles/checkout.module.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await shoppingCartService.getCartByUserId(user.id);
        setCart(data);
        if (user.fullName) {
          setShippingInfo((prev) => ({
            ...prev,
            fullName: user.fullName?.value || user.fullName || "",
            email: user.email?.value || user.email || "",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, navigate]);

  // Load Turnstile script and render widget
  useEffect(() => {
    const loadTurnstile = () => {
      if (
        window.turnstile &&
        turnstileRef.current &&
        !turnstileWidgetId.current
      ) {
        turnstileWidgetId.current = window.turnstile.render(
          turnstileRef.current,
          {
            sitekey: TURNSTILE_SITE_KEY,
            theme: TURNSTILE_THEME,
            callback: (token) => setTurnstileToken(token),
            "expired-callback": () => setTurnstileToken(""),
            "error-callback": () => setTurnstileToken(""),
          },
        );
      }
    };

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ["fullName", "address", "city", "postalCode", "country"];
    for (const field of required) {
      if (!shippingInfo[field].trim()) {
        return `Please fill in your ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const items = cart.items || [];
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      const shipping = subtotal > 100 ? 0 : 9.99;
      const total = subtotal + shipping;

      const fullAddress = `${shippingInfo.fullName}, ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

      const orderData = {
        userId: user.id,
        shippingAddress: fullAddress,
        paymentStatus:
          paymentMethod === "card"
            ? "Card Payment Pending"
            : "Cash on Delivery",
        totalPrice: total,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        turnstileToken: turnstileToken,
      };

      const createdOrder = await orderService.createOrder(orderData);

      // Clear the cart after successful order
      await shoppingCartService.clearCart(user.id);

      // Navigate to success page
      navigate(navigation.getOrderSuccessUrl(createdOrder.id));
    } catch (err) {
      console.error("Failed to create order:", err);
      setError(err.message || "Failed to place order. Please try again.");
      // Reset Turnstile on error
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Loading checkout...</div>
      </div>
    );
  }

  const items = cart?.items || [];

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Checkout</h1>
        </div>
        <div className={styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before proceeding to checkout.</p>
          <Link className={styles.shopButton} to="/products">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.subtitle}>
          Complete your order by filling in the details below
        </p>
      </div>

      <div className={styles.checkoutLayout}>
        <div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span>1</span> Shipping Information
            </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  className={styles.input}
                  type="text"
                  name="fullName"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone</label>
                  <input
                    className={styles.input}
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address *</label>
                <textarea
                  className={styles.textArea}
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite, etc."
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City *</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Postal Code *</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Country *</label>
                <input
                  className={styles.input}
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  required
                />
              </div>
            </form>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span>2</span> Payment Method
            </h2>
            <div className={styles.paymentOptions}>
              <label
                className={`${styles.paymentOption} ${
                  paymentMethod === "card" ? styles.paymentOptionSelected : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className={styles.paymentLabel}>
                  <h4>Credit/Debit Card</h4>
                  <p>Pay securely with your card</p>
                </div>
              </label>
              <label
                className={`${styles.paymentOption} ${
                  paymentMethod === "cod" ? styles.paymentOptionSelected : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className={styles.paymentLabel}>
                  <h4>Cash on Delivery</h4>
                  <p>Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>

          <div className={styles.cartItems}>
            {items.map((item) => (
              <div className={styles.cartItem} key={item.productId}>
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
                  <h4 className={styles.itemName} title={item.productName}>
                    {item.productName}
                  </h4>
                  <span className={styles.itemInfo}>Qty: {item.quantity}</span>
                </div>
                <span className={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className={styles.divider} />

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
              <span>Free shipping applied!</span>
            </div>
          )}

          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          {/* Cloudflare Turnstile widget */}
          <div className={styles.turnstileContainer} ref={turnstileRef}></div>

          <button
            className={styles.placeOrderButton}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Place Order"}
          </button>

          <Link className={styles.backToCartLink} to="/cart">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
