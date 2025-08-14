import { serverUrl } from "../common/generic";
import { get, post, del } from "./requester";

export const getCartByUserId = async (userId) => {
  return await get(`${serverUrl}/shoppingcart/${userId}`);
};

export const addCartItem = async (itemData) => {
  return await post(`${serverUrl}/shoppingcart/items`, itemData);
};

export const removeCartItem = async (itemData) => {
  return await del(`${serverUrl}/shoppingcart/items`, itemData);
};

export const clearCart = async (userId) => {
  return await del(`${serverUrl}/shoppingcart/items/all/${userId}`);
};

export default {
  getCartByUserId,
  addCartItem,
  removeCartItem,
  clearCart,
};
