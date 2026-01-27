import requester from "./requester";
import { serverUrl, serverEndpoints } from "../common/generic";

// Vendors
export const getVendors = async () => {
  return requester.get(`${serverUrl}${serverEndpoints.getVendors}`);
};

// Offers
export const getOffersForProduct = async (productId) => {
  return requester.get(`${serverUrl}${serverEndpoints.getOffersForProduct(productId)}`);
};

export const getLowestOfferForProduct = async (productId) => {
  return requester.get(`${serverUrl}${serverEndpoints.getLowestOfferForProduct(productId)}`);
};

// Prebuilts
export const getPrebuilts = async (params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getPrebuilts(params)}`);
};

export const getPrebuiltById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getPrebuiltById(id)}`);
};

export const getPrebuiltsByPurpose = async (purpose) => {
  return requester.get(`${serverUrl}${serverEndpoints.getPrebuiltsByPurpose(purpose)}`);
};

// Comparison
export const compareBuild = async (buildId) => {
  return requester.get(`${serverUrl}${serverEndpoints.compareBuild(buildId)}`);
};

export const getSimilarPrebuilts = async (buildId, limit) => {
  return requester.get(`${serverUrl}${serverEndpoints.getSimilarPrebuilts(buildId, limit)}`);
};

export const getPriceHistory = async (productId, days) => {
  return requester.get(`${serverUrl}${serverEndpoints.getPriceHistory(productId, days)}`);
};
