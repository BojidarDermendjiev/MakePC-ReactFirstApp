import requester from "./requester";
import { serverUrl, serverEndpoints } from "../common/generic";

export const getNews = async (params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getNews(params)}`);
};

export const getAllNews = async (params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getAllNews(params)}`);
};

export const getNewsById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getNewsById(id)}`);
};

export const getNewsBySlug = async (slug) => {
  return requester.get(`${serverUrl}${serverEndpoints.getNewsBySlug(slug)}`);
};

export const getNewsByTag = async (tag) => {
  return requester.get(`${serverUrl}${serverEndpoints.getNewsByTag(tag)}`);
};

export const getNewsByAuthor = async (authorId) => {
  return requester.get(`${serverUrl}${serverEndpoints.getNewsByAuthor(authorId)}`);
};

export const createNews = async (data) => {
  return requester.post(`${serverUrl}${serverEndpoints.createNews}`, data);
};

export const updateNews = async (id, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateNews(id)}`, data);
};

export const deleteNews = async (id) => {
  return requester.delete(`${serverUrl}${serverEndpoints.deleteNews(id)}`);
};
