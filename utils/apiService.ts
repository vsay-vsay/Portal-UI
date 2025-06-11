// serverApi.ts
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_URL;

// Create Axios instance
const serverApi = axios.create({
  baseURL: `${BASE_URL}/api`, // Adjust if needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies if using session-based auth
});

// Request Interceptor
serverApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or use secure storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
serverApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Optional: Customize error handling
      switch (status) {
        case 401:
          console.warn('Unauthorized - Token may be expired');
          // Redirect to login or show modal if needed
          break;
        case 403:
          console.warn('Forbidden - Access denied');
          break;
        case 500:
          console.error('Server error:', data.message || 'Internal server error');
          break;
        default:
          console.error(`Error ${status}:`, data.message || error.message);
          break;
      }
    } else {
      console.error('Network/Unknown error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default serverApi;
