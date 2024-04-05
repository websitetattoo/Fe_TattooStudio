const NEXT_PUBLIC_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

class HttpError extends Error {
  status: number;
  data: any;
  constructor({ status, data }: { status: number; data: any }) {
    super("Http Error");
    this.status = status;
    this.data = data;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "multipart/form-data;",
  };
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ env.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined ? NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  console.log(`URL: ${fullUrl}: ${res}`);
  //Nếu status = 204 là no content -> data = null
  if (res.status === 204) {
    // No content in the response
    return {
      status: res.status,
      data: null, // Or any other appropriate value indicating success
    };
  }
  let payload;
  try {
    // Thử chuyển đổi dữ liệu sang JSON
    payload = await res.json();
  } catch (error) {
    // Nếu không thể chuyển đổi sang JSON, sử dụng dữ liệu dưới dạng văn bản
    payload = await JSON.stringify(res);
  }
  const data = {
    status: res.status,
    data: payload,
  };
  if (!res.ok) {
    throw new HttpError(data);
  }
  //   if (["/auth/login", "/auth/register"].includes(url)) {
  //     clientSessionToken.value = (payload as LoginResType).data.token;
  //   } else if ("/auth/logout".includes(url)) {
  //     clientSessionToken.value = "";
  //   }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
