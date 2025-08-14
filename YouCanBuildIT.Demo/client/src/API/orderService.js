import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllOrders = async () => {
  return await get(`${serverUrl}/order`);
};

export const getOrdersByUserId = async (userId) => {
  return await get(`${serverUrl}/order/user/${userId}`);
};

export const getOrderById = async (id) => {
  return await get(`${serverUrl}/order/${id}`);
};

export const createOrder = async (orderData) => {
  return await post(`${serverUrl}/order`, orderData);
};

export const updateOrder = async (id, orderData) => {
  return await put(`${serverUrl}/order/${id}`, orderData);
};

export const deleteOrder = async (id) => {
  return await del(`${serverUrl}/order/${id}`);
};

export default {
  getAllOrders,
  getOrdersByUserId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
