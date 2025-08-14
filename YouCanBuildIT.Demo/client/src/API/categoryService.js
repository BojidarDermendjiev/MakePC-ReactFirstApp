import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllCategories = async () => {
  return await get(`${serverUrl}/category`);
};

export const getCategoryById = async (id) => {
  return await get(`${serverUrl}/category/${id}`);
};

export const createCategory = async (categoryData) => {
  return await post(`${serverUrl}/category`, categoryData);
};

export const updateCategory = async (id, categoryData) => {
  return await put(`${serverUrl}/category/${id}`, categoryData);
};

export const deleteCategory = async (id) => {
  return await del(`${serverUrl}/category/${id}`);
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
