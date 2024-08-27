import { getAccessToken, removeUserDetails } from './auth';

// Define the allowed HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Interface defining the options for the API client
interface ApiClientOptions {
  method: HttpMethod;        // HTTP method to use
  url: string;               // Endpoint URL
  body?: any;                // Request body (optional)
  headers?: Record<string, string>;  // Additional headers (optional)
  requiresAuth?: boolean;    // Whether the request requires authentication (default: true)
  onUnauthorized?: () => void;  // Callback for unauthorized requests (optional)
}

// Base URL for the API, fetched from environment variables
const BASE_URL = process.env.REACT_APP_BASE_URL_DEV;

/**
 * Generic API client function to make HTTP requests
 * @template T The expected return type of the API call
 * @param {ApiClientOptions} options - The options for the API call
 * @returns {Promise<T>} A promise that resolves with the API response
 * @throws {Error} If the request is unauthorized or fails
 */
async function apiClient<T>({ 
  method, 
  url, 
  body, 
  headers = {}, 
  requiresAuth = true, 
  onUnauthorized 
}: ApiClientOptions): Promise<T> {
  // Construct the full URL
  const fullUrl = `${BASE_URL}${url}`;
  
  // Add authorization header if required
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Prepare the request options
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  // Make the API call
  const response = await fetch(fullUrl, options);

  // Handle unauthorized responses
  if (response.status === 401) {
    removeUserDetails();
    throw new Error('Unauthorized');
  }

  // Handle other error responses
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse and return the JSON response
  return response.json();
}

export default apiClient;