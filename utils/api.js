import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://10.17.249.83:8000/api"; // For Android emulator


console.log("API URL:", API_URL);

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000, // 15 second timeout
});

// Add Bearer token automatically
api.interceptors.request.use(
  async (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    console.log('Full URL:', config.baseURL + config.url);
    try {
      const token = await AsyncStorage.getItem('fishta_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token added to request');
      }
    } catch (error) {
      console.error('Error getting token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  async (error) => {
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      code: error.code,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method
      }
    });
    
    if (error.response?.status === 401) {
      // Token expired or invalid, remove it
      try {
        await AsyncStorage.removeItem('fishta_token');
        console.log('Token removed due to 401 error');
      } catch (storageError) {
        console.error('Error removing token:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;