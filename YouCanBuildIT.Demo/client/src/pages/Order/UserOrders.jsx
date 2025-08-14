import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../../API/orderService"; // Make sure you have this service!
import { AuthContext } from "../../context/AuthContextProvider";
import { navigation } from "../../common/navigations";

const UserOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      orderService
        .getOrdersByUserId(user.id)
        .then(setOrders)
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading) return <div>Loading orders...</div>;
  if (!orders.length) return <div>No orders found.</div>;

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <span>
              Order #{order.id} - {order.status} - {order.totalPrice} USD
            </span>
            <button
              onClick={() => navigate(navigation.getOrderDetailsUrl(order.id))}
            >
              Details
            </button>
            <button
              onClick={() => navigate(navigation.getOrderEditUrl(order.id))}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(navigation.getOrderCreateUrl())}>
        Create New Order
      </button>
    </div>
  );
};

export default UserOrders;
