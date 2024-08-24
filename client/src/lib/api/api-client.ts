import { getToken, removeToken } from './auth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiClientOptions {
  method: HttpMethod;
  url: string;
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

const BASE_URL = "http://127.0.0.1:5000";

async function apiClient<T>({ method, url, body, headers = {}, requiresAuth = true }: ApiClientOptions): Promise<T> {
  const fullUrl = `${BASE_URL}${url}`;
  
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(fullUrl, options);

  if (response.status === 401) {
    removeToken();
    
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default apiClient;