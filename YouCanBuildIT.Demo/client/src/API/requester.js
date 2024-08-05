import { getAccessToken } from "../utils/AuthUtils/authUtils";

export async function requester(method, url, data) {
  const options = {};

  const accessToken = getAccessToken();

  if (accessToken && url !== `${serverUrl}${serverEndpoints.logout}`) {
    options.headers = {
      ...options.headers,
      "X-Authorization": accessToken,
    };
  }

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };

    options.body = JSON.stringify(data);
  }

  try {
    console.log(`Making ${method} request to ${url} with options:`, options);
    const response = await fetch(url, options);

    if (response.status === 204) {
      return;
    }

    const result = await response.json();

    if (!response.ok) {
      console.error(
        `Request to ${url} failed with status ${response.status}:`,
        result
      );
      throw result;
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");

export default {
  get,
  post,
  put,
  del,
};
