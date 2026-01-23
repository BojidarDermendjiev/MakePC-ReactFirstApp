import { serverUrl } from "../common/generic";
import { get } from "./requester";

const baseUrl = `${serverUrl}/keyboards`;

export const getKeyboards = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });

  const queryString = params.toString();
  const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  return await get(url);
};

export const getKeyboardById = async (id) => {
  return await get(`${baseUrl}/${id}`);
};

export const getFilterOptions = async () => {
  return await get(`${baseUrl}/filter-options`);
};

export const getSwitchGuide = async () => {
  return await get(`${baseUrl}/switch-guide`);
};

export const getSizeGuide = async () => {
  return await get(`${baseUrl}/size-guide`);
};

export default {
  getKeyboards,
  getKeyboardById,
  getFilterOptions,
  getSwitchGuide,
  getSizeGuide,
};
