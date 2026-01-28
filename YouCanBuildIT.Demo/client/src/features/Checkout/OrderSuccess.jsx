import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orderService from "../../api/orderService.js";
import { navigation } from "../../common/navigations";
import styles from "../../assets/styles/orderSuccess.module.css";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Order Not Found</h2>
          <p>We could not find the order you are looking for.</p>
          <Link className={styles.primaryButton} to={navigation.getOrdersUrl()}>
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusClass = (() => {
    const s = (order.paymentStatus || "").toLowerCase();
    if (s.includes("completed")) return styles.orderStatusCompleted;
    if (s.includes("pending")) return styles.orderStatusPending;
    if (s.includes("cancel")) return styles.orderStatusCancelled;
    return styles.orderStatusDefault;
  })();

  return (
    <div className={styles.container}>
      <div className={styles.successIcon}>
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1 className={styles.title}>Order Placed Successfully!</h1>
      <p className={styles.subtitle}>
        Thank you for your purchase. A confirmation email has been sent to your
        email address.
      </p>

      <div className={styles.orderCard}>
        <div className={styles.orderHeader}>
          <div className={styles.orderNumber}>
            <h3>Order #{order.id}</h3>
            <p>Placed on {formatDate(order.orderDate)}</p>
          </div>
          <span className={`${styles.orderStatus} ${statusClass}`}>
            {order.paymentStatus}
          </span>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Items Ordered</h4>
          <div className={styles.itemsList}>
            {order.items?.map((item) => (
              <div className={styles.orderItem} key={item.id}>
                <div className={styles.itemInfo}>
                  <h5>{item.productName}</h5>
                  <p>
                    Qty: {item.quantity} x ${item.unitPrice?.toFixed(2)}
                  </p>
                </div>
                <span className={styles.itemPrice}>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Delivery Details</h4>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <p>Shipping Address</p>
              <span>{order.shippingAddress}</span>
            </div>
            <div className={styles.summaryItem}>
              <p>Payment Method</p>
              <span>{order.paymentStatus}</span>
            </div>
          </div>
        </div>

        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total Amount</span>
          <span className={styles.totalAmount}>
            ${order.totalPrice?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <Link className={styles.secondaryButton} to={navigation.getOrdersUrl()}>
          View All Orders
        </Link>
        <Link className={styles.primaryButton} to={navigation.getProductsUrl()}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
