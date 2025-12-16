import Cookies from "js-cookie";

let refreshPromise: Promise<void> | null = null;

const refreshToken = () => {
  if (!refreshPromise) {
    refreshPromise = fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reissue`,
      {
        method: "POST",
        credentials: "include",
      }
    )
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

const fetchUtil = async (
  endpoint: string,
  method: string,
  params: Record<string, any> = {},
  body?: any,
  retried = false
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${endpoint}`);

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, String(params[key]));
    }
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    const accessToken = Cookies.get("ACCESS_TOKEN");
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && !retried && endpoint !== "/reissue") {
    // ✅ 쿠키 재발급 후 기존 요청 다시 보냄
    await refreshToken();
    return fetchUtil(endpoint, method, params, body, true);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Status: ${response.status}`);
  }

  return response.json();
};

export const fetchInstance = {
  get: (endPoint: string, params: Record<string, any> = {}) => {
    return fetchUtil(endPoint, "GET", params);
  },
  post: (endPoint: string, body: any) => {
    return fetchUtil(endPoint, "POST", {}, body);
  },
  put: (endpoint: string, body: any) => {
    return fetchUtil(endpoint, "PUT", {}, body);
  },
  delete: (endpoint: string, body?: any) => {
    return fetchUtil(endpoint, "DELETE", {}, body);
  },
  patch: (endpoint: string, body: any, params: Record<string, any> = {}) => {
    return fetchUtil(endpoint, "PATCH", params, body);
  }
}