import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const basketApi = {
  getUserBaskets: async (userId: string) => {
    return await get(`${serverUrl}${serverEndpoints.getUserBaskets(userId)}`);
  },

  getBasketById: async (id: string) => {
    return await get(`${serverUrl}${serverEndpoints.getBasketById(id)}`);
  },

  createBasket: async (basketData: any) => {
    return await post(
      `${serverUrl}${serverEndpoints.createBasket}`,
      basketData
    );
  },

  updateBasket: async (id: string, basketData: any) => {
    return await put(
      `${serverUrl}${serverEndpoints.updateBasket(id)}`,
      basketData
    );
  },

  deleteBasket: async (id: string) => {
    return await del(`${serverUrl}${serverEndpoints.deleteBasket(id)}`);
  },

  addToBasket: async (basketId: string, productId: string, quantity: number) => {
    return await post(
      `${serverUrl}${serverEndpoints.addToBasket}`,
      { basketId, productId, quantity }
    );
  }
};