import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.data?.message) {
      // You could integrate with a toast notification system here
      console.log('Success:', response.data.message);
    }
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/admin-login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission to perform this action');
          break;
        case 404:
          console.error('Not Found: The requested resource does not exist');
          break;
        case 422:
          console.error('Validation Error:', error.response.data.message);
          break;
        case 500:
          console.error('Server Error:', error.response.data.message);
          break;
        default:
          console.error('API Error:', error.response.data.message || 'An unknown error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response received from server');
    } else {
      // Error in request configuration
      console.error('Request Configuration Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Event-specific API methods
const eventApi = {
  getAll: () => api.get('/api/events'),
  create: (eventData: any) => api.post('/api/events', eventData),
  update: (id: string, eventData: any) => api.put(`/api/events/${id}`, eventData),
  delete: (id: string) => api.delete(`/api/events/${id}`),
};

export { eventApi };
export default api;
