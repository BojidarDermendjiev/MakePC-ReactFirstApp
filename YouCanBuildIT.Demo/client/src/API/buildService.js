import requester from "./requester";
import { serverUrl, serverEndpoints } from "../common/generic";

// Builds
export const getBuilds = async (params = {}) => {
  return requester.get(`${serverUrl}${serverEndpoints.getBuilds(params)}`);
};

export const getBuildById = async (id) => {
  return requester.get(`${serverUrl}${serverEndpoints.getBuildById(id)}`);
};

export const getMyBuilds = async () => {
  return requester.get(`${serverUrl}${serverEndpoints.getMyBuilds}`);
};

export const getPublicBuilds = async (limit) => {
  return requester.get(`${serverUrl}${serverEndpoints.getPublicBuilds(limit)}`);
};

export const createBuild = async (data) => {
  return requester.post(`${serverUrl}${serverEndpoints.createBuild}`, data);
};

export const updateBuild = async (id, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateBuild(id)}`, data);
};

export const deleteBuild = async (id) => {
  return requester.del(`${serverUrl}${serverEndpoints.deleteBuild(id)}`);
};

// Build Items
export const addBuildItem = async (buildId, data) => {
  return requester.post(`${serverUrl}${serverEndpoints.addBuildItem(buildId)}`, data);
};

export const updateBuildItem = async (buildId, itemId, data) => {
  return requester.put(`${serverUrl}${serverEndpoints.updateBuildItem(buildId, itemId)}`, data);
};

export const removeBuildItem = async (buildId, itemId) => {
  return requester.del(`${serverUrl}${serverEndpoints.removeBuildItem(buildId, itemId)}`);
};

// Compatibility
export const checkBuildCompatibility = async (buildId) => {
  return requester.get(`${serverUrl}${serverEndpoints.checkBuildCompatibility(buildId)}`);
};

export const getBuildSuggestions = async (buildId, componentType) => {
  return requester.get(`${serverUrl}${serverEndpoints.getBuildSuggestions(buildId, componentType)}`);
};
