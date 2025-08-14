import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllBrands = async () => {
  return await get(`${serverUrl}/brand`);
};

export const getBrandById = async (id) => {
  return await get(`${serverUrl}/brand/${id}`);
};

export const createBrand = async (brandData) => {
  return await post(`${serverUrl}/brand`, brandData);
};

export const updateBrand = async (id, brandData) => {
  return await put(`${serverUrl}/brand/${id}`, brandData);
};

export const deleteBrand = async (id) => {
  return await del(`${serverUrl}/brand/${id}`);
};

export default {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
