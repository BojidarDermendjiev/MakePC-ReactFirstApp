import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

export const getAllReviews = async () => {
  return await get(`${serverUrl}/review`);
};

export const getReviewById = async (id) => {
  return await get(`${serverUrl}/review/${id}`);
};

export const getReviewsByProductId = async (productId) => {
  return await get(`${serverUrl}/review/product/${productId}`);
};

export const getReviewsByUserId = async (userId) => {
  return await get(`${serverUrl}/review/user/${userId}`);
};

export const createReview = async (reviewData) => {
  return await post(`${serverUrl}/review`, reviewData);
};

export const updateReview = async (id, reviewData) => {
  return await put(`${serverUrl}/review/${id}`, reviewData);
};

export const deleteReview = async (id) => {
  return await del(`${serverUrl}/review/${id}`);
};

export default {
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
};
