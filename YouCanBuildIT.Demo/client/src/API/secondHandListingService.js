import { serverUrl, serverEndpoints } from "../common/generic";
import { get, post, put, del } from "./requester";

/**
 * Get all second-hand listings with optional filtering and pagination
 * @param {Object} params - Filter parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.size - Page size (default: 10)
 * @param {number} params.categoryId - Filter by category ID
 * @param {number} params.brandId - Filter by brand ID
 * @param {number} params.minPrice - Minimum price filter
 * @param {number} params.maxPrice - Maximum price filter
 * @param {string} params.search - Search query
 * @param {string} params.sortBy - Sort field ('price', 'views', 'title', 'date')
 * @param {boolean} params.sortDesc - Sort descending (default: false)
 */
export const getAllListings = async (params = {}) => {
  const defaultParams = { page: 1, size: 10 };
  const mergedParams = { ...defaultParams, ...params };
  return await get(
    `${serverUrl}${serverEndpoints.getAllSecondHandListings(mergedParams)}`
  );
};

export const getListingById = async (id) => {
  return await get(`${serverUrl}${serverEndpoints.getSecondHandListingById(id)}`);
};

export const getListingsByCategory = async (categoryId) => {
  return await get(
    `${serverUrl}${serverEndpoints.getSecondHandListingsByCategory(categoryId)}`
  );
};

export const getListingsBySeller = async (sellerId) => {
  return await get(
    `${serverUrl}${serverEndpoints.getSecondHandListingsBySeller(sellerId)}`
  );
};

export const getMyListings = async () => {
  return await get(`${serverUrl}${serverEndpoints.getMySecondHandListings}`);
};

export const createListing = async (listingData) => {
  return await post(
    `${serverUrl}${serverEndpoints.createSecondHandListing}`,
    listingData
  );
};

export const updateListing = async (id, listingData) => {
  return await put(
    `${serverUrl}${serverEndpoints.updateSecondHandListing(id)}`,
    listingData
  );
};

export const deleteListing = async (id) => {
  return await del(`${serverUrl}${serverEndpoints.deleteSecondHandListing(id)}`);
};

export const markAsSold = async (id, buyerId) => {
  return await post(
    `${serverUrl}${serverEndpoints.markSecondHandListingAsSold(id)}`,
    { buyerId }
  );
};

export default {
  getAllListings,
  getListingById,
  getListingsByCategory,
  getListingsBySeller,
  getMyListings,
  createListing,
  updateListing,
  deleteListing,
  markAsSold,
};
