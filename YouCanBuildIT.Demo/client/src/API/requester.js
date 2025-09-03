import { getAccessToken } from "../utils/AuthUtils/authUtils";
import { serverApiUrl, serverEndpoints } from "../common/generic";

const API_KEY = import.meta.env.VITE_API_KEY;

async function baseRequester(method, url, data, customHeaders = {}) {
  const headers = {};
  const token = getAccessToken();

  if (API_KEY) headers["X-API-KEY"] = API_KEY;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (data instanceof FormData) {
    options.body = data;
  } else if (data !== undefined && data !== null) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  for (const key in customHeaders) {
    if (data instanceof FormData && key.toLowerCase() === "content-type")
      continue;
    headers[key] = customHeaders[key];
  }

  console.log(`Making ${method} request to ${url} with options:`, options);
  const response = await fetch(url, options);

  if (response.status === 204) return;

  const contentType = response.headers.get("content-type");
  const result =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    console.error(
      `Request to ${url} failed with status ${response.status}:`,
      result
    );
    throw typeof result === "object" ? result : { error: result };
  }

  return result;
}

export const get = baseRequester.bind(null, "GET");
export const post = baseRequester.bind(null, "POST");
export const put = baseRequester.bind(null, "PUT");
export const del = baseRequester.bind(null, "DELETE");

export default { get, post, put, del };
