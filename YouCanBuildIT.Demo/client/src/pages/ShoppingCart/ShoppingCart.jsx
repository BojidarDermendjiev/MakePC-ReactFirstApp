
import shoppingCartService from "../../api/shoppingCartService.js";
import { AuthContext } from "../../context/AuthContextProvider";

const ShoppingCart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      shoppingCartService
        .getCartByUserId(user.id)
        .then(setCart)
        .catch(() => setCart([]))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  const handleRemove = async (productId) => {
    await shoppingCartService.removeCartItem({ userId: user.id, productId });
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const handleClearCart = async () => {
    await shoppingCartService.clearCart(user.id);
    setCart([]);
  };

  if (loading) return <div>Loading...</div>;
  if (!cart.length) return <div>Your cart is empty.</div>;

  return (
    <div>
      <h1>Shopping Cart</h1>
      <button onClick={handleClearCart}>Clear Cart</button>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            <span>
              {item.productName} (x{item.quantity})
            </span>
            <button onClick={() => handleRemove(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
