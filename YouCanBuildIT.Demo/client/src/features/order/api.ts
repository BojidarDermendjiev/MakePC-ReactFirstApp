import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const orderApi = {
  getUserOrders: async (userId: string) => {
    return await get(`${serverUrl}${serverEndpoints.getUserOrders(userId)}`);
  },

  getOrderById: async (id: string) => {
    return await get(`${serverUrl}${serverEndpoints.getOrderById(id)}`);
  },

  createOrder: async (orderData: any) => {
    return await post(
      `${serverUrl}${serverEndpoints.createOrder}`,
      orderData
    );
  },

  updateOrder: async (id: string, orderData: any) => {
    return await put(
      `${serverUrl}${serverEndpoints.updateOrder(id)}`,
      orderData
    );
  },

  deleteOrder: async (id: string) => {
    return await del(`${serverUrl}${serverEndpoints.deleteOrder(id)}`);
  }
};