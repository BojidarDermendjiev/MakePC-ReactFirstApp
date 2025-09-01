import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const productApi = {
  getAllProducts: async () => {
    return await get(`${serverUrl}${serverEndpoints.getAllProducts}`);
  },

  getProductById: async (id: string) => {
    return await get(`${serverUrl}${serverEndpoints.getProductById(id)}`);
  },

  createProduct: async (productData: any) => {
    return await post(
      `${serverUrl}${serverEndpoints.createProduct}`,
      productData
    );
  },

  updateProduct: async (id: string, productData: any) => {
    return await put(
      `${serverUrl}${serverEndpoints.updateProduct(id)}`,
      productData
    );
  },

  deleteProduct: async (id: string) => {
    return await del(`${serverUrl}${serverEndpoints.deleteProduct(id)}`);
  },

  searchProducts: async (query: string) => {
    return await get(`${serverUrl}${serverEndpoints.searchProducts}?q=${encodeURIComponent(query)}`);
  }
};