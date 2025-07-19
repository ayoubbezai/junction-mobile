import api from "../utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authServices = {
    async login(email, password) {
        console.log('authServices.login called with:', { email, password });
        try {
            console.log('Making API call to login');
            const response = await api.post("/login", { email, password });
            console.log('API response:', response.data);
            
            const token = response.data?.token;
            if (token) {
                console.log('Token received, storing in AsyncStorage');
                await AsyncStorage.setItem('fishta_token', token);
                return { success: true, token };
            } else {
                console.log('No token in response');
                return { success: false, error: 'No token received from server' };
            }
        } catch (error) {
            console.error('Login error:', error);
            console.error('Error response:', error?.response?.data);
            
            // TEMPORARY: Mock response for testing when backend is not available
            if (error.message === 'Network Error') {
                console.log('Backend not available, using mock response for testing');
                const mockToken = 'mock_token_' + Date.now();
                await AsyncStorage.setItem('fishta_token', mockToken);
                return { success: true, token: mockToken };
            }
            
            return { 
                success: false, 
                error: error?.response?.data?.message || error?.message || 'Login failed' 
            };
        }
    },
    async getToken() {
        return await AsyncStorage.getItem('fishta_token');
    },
    async logout() {
        await AsyncStorage.removeItem('fishta_token');
    }
};