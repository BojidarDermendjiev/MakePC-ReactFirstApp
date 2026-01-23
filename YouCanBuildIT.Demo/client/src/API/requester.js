const API_KEY = import.meta.env.VITE_API_KEY;
const IS_DEV = import.meta.env.DEV;

async function baseRequester(method, url, data, customHeaders = {}) {
  const headers = {};

  if (API_KEY) headers["X-API-KEY"] = API_KEY;

  // Use credentials: 'include' to send/receive HTTP-only cookies
  const options = {
    method,
    headers,
    credentials: "include", // Enable cookie-based authentication
  };

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

  // Only log in development mode, and don't log sensitive headers
  if (IS_DEV) {
    console.log(`Making ${method} request to ${url}`);
  }

  const response = await fetch(url, options);

  if (response.status === 204) return;

  const contentType = response.headers.get("content-type");
  const result =
    contentType && contentType.includes("application/json")
      ? await response.json()
      : await response.text();

  if (!response.ok) {
    if (IS_DEV) {
      console.error(`Request to ${url} failed with status ${response.status}`);
    }
    throw typeof result === "object" ? result : { error: result };
  }

  return result;
}

export const get = baseRequester.bind(null, "GET");
export const post = baseRequester.bind(null, "POST");
export const put = baseRequester.bind(null, "PUT");
export const del = baseRequester.bind(null, "DELETE");

export default { get, post, put, del };
