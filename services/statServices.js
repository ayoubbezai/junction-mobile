import api from "../utils/api";

export const statServices = {
    async getStat() {
        try {
            console.log('Fetching dashboard statistics...');
            const response = await api.get("/stat");
            console.log('Stats response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching stats:', error);
            return { success: false, error: error?.response?.data?.message || 'Failed to fetch stats' };
        }
    }
};