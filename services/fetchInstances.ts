let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const refreshToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reissue`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token refresh failed");
        }
      })
      .finally(() => {
        isRefreshing = false;
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

  const response = await fetch(url.toString(), {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  // ✅ 정상 응답
  if (response.ok) {
    return response.json();
  }

  // 🔁 ACCESS TOKEN 만료 → 재발급 후 1회 재시도
  if (response.status === 401 && !retried) {
    try {
      await refreshToken();
      return fetchUtil(endpoint, method, params, body, true);
    } catch (e) {
      throw e;
    }
  }

  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.message || `Status: ${response.status}`);
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