
import orderService from "../../api/orderService";
import { useNavigate, useParams } from "react-router-dom";

const OrderForm = ({ initialData = {}, isEdit = false }) => {
  const [orderData, setOrderData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      orderService
        .getOrderById(id)
        .then((data) => setOrderData(data))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isEdit) {
      await orderService.updateOrder(id, orderData);
    } else {
      await orderService.createOrder(orderData);
    }
    setLoading(false);
    navigate("/orders");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <input
          name="status"
          value={orderData.status || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Total Price:
        <input
          name="totalPrice"
          type="number"
          value={orderData.totalPrice || ""}
          onChange={handleChange}
          required
        />
      </label>
      {/* Add more fields as needed */}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Order" : "Create Order"}
      </button>
    </form>
  );
};

export default OrderForm;
