import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllBaskets = async () => {
  return await get(`${serverUrl}/basket`);
};

export const getBasketById = async (id) => {
  return await get(`${serverUrl}/basket/${id}`);
};

export const getBasketByUserId = async (userId) => {
  return await get(`${serverUrl}/basket/user/${userId}`);
};

export const createBasket = async (basketData) => {
  return await post(`${serverUrl}/basket`, basketData);
};

export const updateBasket = async (id, basketData) => {
  return await put(`${serverUrl}/basket/${id}`, basketData);
};

export const deleteBasket = async (id) => {
  return await del(`${serverUrl}/basket/${id}`);
};

export default {
  getAllBaskets,
  getBasketById,
  getBasketByUserId,
  createBasket,
  updateBasket,
  deleteBasket,
};
