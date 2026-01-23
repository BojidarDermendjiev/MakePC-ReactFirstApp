import requester from "./requester";
import { serverUrl, serverEndpoints } from "../common/generic";

// Categories
export const getCategories = async () => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumCategories}`);
};

export const getCategoryById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumCategoryById(id)}`);
};

export const getCategoryBySlug = async (slug) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumCategoryBySlug(slug)}`);
};

export const createCategory = async (data) => {
  return requester.post(`${serverUrl}${serverEndpoints.createForumCategory}`, data);
};

export const updateCategory = async (id, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateForumCategory(id)}`, data);
};

export const deleteCategory = async (id) => {
  return requester.delete(`${serverUrl}${serverEndpoints.deleteForumCategory(id)}`);
};

// Threads
export const getThreads = async (params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumThreads(params)}`);
};

export const getThreadById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumThreadById(id)}`);
};

export const getThreadBySlug = async (slug) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumThreadBySlug(slug)}`);
};

export const getThreadsByAuthor = async (authorId) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumThreadsByAuthor(authorId)}`);
};

export const createThread = async (data) => {
  return requester.post(`${serverUrl}${serverEndpoints.createForumThread}`, data);
};

export const updateThread = async (id, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateForumThread(id)}`, data);
};

export const deleteThread = async (id) => {
  return requester.delete(`${serverUrl}${serverEndpoints.deleteForumThread(id)}`);
};

// Posts
export const getPosts = async (threadId, params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumPosts(threadId, params)}`);
};

export const getPostById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getForumPostById(id)}`);
};

export const createPost = async (data) => {
  return requester.post(`${serverUrl}${serverEndpoints.createForumPost}`, data);
};

export const updatePost = async (id, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateForumPost(id)}`, data);
};

export const deletePost = async (id) => {
  return requester.delete(`${serverUrl}${serverEndpoints.deleteForumPost(id)}`);
};
