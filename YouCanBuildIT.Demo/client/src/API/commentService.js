import { serverUrl } from "../common/generic";
import { get, post, put, del } from "./requester";

const baseUrl = `${serverUrl}/comments`;

export const getCommentById = async (id) => {
  return await get(`${baseUrl}/${id}`);
};

export const getCommentsByEntity = async (entityType, entityId, page = 1, pageSize = 20) => {
  return await get(`${baseUrl}/entity/${entityType}/${entityId}?page=${page}&pageSize=${pageSize}`);
};

export const getReplies = async (commentId) => {
  return await get(`${baseUrl}/${commentId}/replies`);
};

export const createComment = async (commentData) => {
  return await post(baseUrl, commentData);
};

export const updateComment = async (id, commentData) => {
  return await put(`${baseUrl}/${id}`, commentData);
};

export const deleteComment = async (id) => {
  return await del(`${baseUrl}/${id}`);
};

export const reactToComment = async (id, reactionType) => {
  return await post(`${baseUrl}/${id}/react`, { reactionType });
};

export default {
  getCommentById,
  getCommentsByEntity,
  getReplies,
  createComment,
  updateComment,
  deleteComment,
  reactToComment,
};
