import { getAccessToken } from "../utils/AuthUtils/authUtils";
import { serverUrl, serverEndpoints } from "../common/generic";

/**
 * General HTTP requester utility supporting GET, POST, PUT, DELETE.
 * Handles JSON and FormData automatically, sets Authorization header if available.
 */
async function baseRequester(method, url, data, customHeaders = {}) {
  const options = {
    method,
    headers: {},
  };

  const accessToken = getAccessToken();
  if (accessToken && url !== `${serverUrl}${serverEndpoints.logout}`) {
    options.headers.Authorization = `Bearer ${accessToken}`;
  }

  // Handle FormData uploads (for files)
  if (data instanceof FormData) {
    options.body = data;
    // DO NOT set "Content-Type" header for FormData!
    // Browser will set correct multipart/form-data boundary
  } else if (data !== undefined && data !== null) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  // Add any custom headers except Content-Type for FormData
  for (const key in customHeaders) {
    // Don't override Content-Type for FormData
    if (data instanceof FormData && key.toLowerCase() === "content-type")
      continue;
    options.headers[key] = customHeaders[key];
  }

  try {
    console.log(`Making ${method} request to ${url} with options:`, options);
    const response = await fetch(url, options);

    // No content
    if (response.status === 204) {
      return;
    }

    // Try to parse JSON (handle cases where response is not JSON)
    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (!response.ok) {
      console.error(
        `Request to ${url} failed with status ${response.status}:`,
        result
      );
      throw typeof result === "object" ? result : { error: result };
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    throw error;
  }
}

export const get = baseRequester.bind(null, "GET");
export const post = baseRequester.bind(null, "POST");
export const put = baseRequester.bind(null, "PUT");
export const del = baseRequester.bind(null, "DELETE");

export default {
  get,
  post,
  put,
  del,
};
