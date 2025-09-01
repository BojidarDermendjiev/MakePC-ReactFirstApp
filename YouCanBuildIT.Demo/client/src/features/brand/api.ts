import { serverUrl, serverEndpoints } from "../../common/generic";
import { get, post, put, del } from "../requester";

export const brandApi = {
  getAllBrands: async () => {
    return await get(`${serverUrl}${serverEndpoints.getAllBrands}`);
  },

  getBrandById: async (id: string) => {
    return await get(`${serverUrl}${serverEndpoints.getBrandById(id)}`);
  },

  createBrand: async (brandData: any) => {
    return await post(
      `${serverUrl}${serverEndpoints.createBrand}`,
      brandData
    );
  },

  updateBrand: async (id: string, brandData: any) => {
    return await put(
      `${serverUrl}${serverEndpoints.updateBrand(id)}`,
      brandData
    );
  },

  deleteBrand: async (id: string) => {
    return await del(`${serverUrl}${serverEndpoints.deleteBrand(id)}`);
  }
};