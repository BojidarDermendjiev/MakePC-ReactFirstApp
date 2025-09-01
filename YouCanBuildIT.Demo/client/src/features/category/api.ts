import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const categoryApi = {
  getAllCategories: async () => {
    return await get(`${serverUrl}${serverEndpoints.getAllCategories}`);
  },

  getCategoryById: async (id: string) => {
    return await get(`${serverUrl}${serverEndpoints.getCategoryById(id)}`);
  },

  createCategory: async (categoryData: any) => {
    return await post(
      `${serverUrl}${serverEndpoints.createCategory}`,
      categoryData
    );
  },

  updateCategory: async (id: string, categoryData: any) => {
    return await put(
      `${serverUrl}${serverEndpoints.updateCategory(id)}`,
      categoryData
    );
  },

  deleteCategory: async (id: string) => {
    return await del(`${serverUrl}${serverEndpoints.deleteCategory(id)}`);
  }
};