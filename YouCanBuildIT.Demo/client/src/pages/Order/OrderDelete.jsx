
import orderService from "../../api/orderService";
import { useNavigate } from "react-router-dom";

const OrderDeleteButton = ({ orderId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await orderService.deleteOrder(orderId);
      navigate("/orders");
    }
  };

  return <button onClick={handleDelete}>Delete Order</button>;
};

export default OrderDeleteButton;
