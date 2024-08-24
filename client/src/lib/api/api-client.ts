type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
  method: HttpMethod;
  url: string;
  body?: any;
  headers?: Record<string, string>;
}

const BASE_URL = "http://127.0.0.1:5000";

async function apiClient<T>({ method, url, body, headers = {} }: ApiClientOptions): Promise<T> {
  const fullUrl = `${BASE_URL}${url}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default apiClient;