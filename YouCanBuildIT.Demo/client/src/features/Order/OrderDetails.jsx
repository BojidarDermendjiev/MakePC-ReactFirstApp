import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import orderService from "../../api/orderService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading order...</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div>
      <button onClick={() => navigate("/orders")}>Back to Orders</button>
      <h2>Order #{order.id}</h2>
      <div>Status: {order.status}</div>
      <div>Total: ${order.totalPrice}</div>
      <div>
        Items:
        <ul>
          {order.items?.map((item) => (
            <li key={item.productId}>
              {item.productName} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
