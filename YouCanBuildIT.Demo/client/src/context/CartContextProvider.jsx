import { createContext, useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import shoppingCartService from "../api/shoppingCartService";
import { AuthContext } from "./AuthContextProvider";

export const CartContext = createContext({
  cart: null,
  cartItemCount: 0,
  loading: false,
  addToCart: async () => {},
  updateQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const refreshCart = useCallback(async () => {
    if (!user?.id) {
      setCart(null);
      return;
    }

    try {
      const data = await shoppingCartService.getCartByUserId(user.id);
      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart({ items: [] });
    }
  }, [user?.id]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!user?.id) return null;

    setLoading(true);
    try {
      const updatedCart = await shoppingCartService.addCartItem({
        userId: user.id,
        productId,
        quantity,
      });
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error("Failed to add to cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateQuantity = useCallback(async (productId, newQuantity) => {
    if (!user?.id || newQuantity < 1) return null;

    setLoading(true);
    try {
      const updatedCart = await shoppingCartService.updateCartItem({
        userId: user.id,
        productId,
        quantity: newQuantity,
      });
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error("Failed to update quantity:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const removeFromCart = useCallback(async (productId) => {
    if (!user?.id) return null;

    setLoading(true);
    try {
      const updatedCart = await shoppingCartService.removeCartItem({
        userId: user.id,
        productId,
      });
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const clearCart = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      await shoppingCartService.clearCart(user.id);
      setCart({ items: [] });
    } catch (err) {
      console.error("Failed to clear cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const contextValue = {
    cart,
    cartItemCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
