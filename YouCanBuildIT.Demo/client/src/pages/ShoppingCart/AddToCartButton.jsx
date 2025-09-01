
import shoppingCartService from "../../API/shoppingCartService.js";
import { AuthContext } from "../../context/AuthContextProvider";

const AddToCartButton = ({ productId, productName }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await shoppingCartService.addCartItem({
      userId: user.id,
      productId,
      quantity: 1,
      productName,
    });
    setLoading(false);
  };

  return (
    <button onClick={handleAdd} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
