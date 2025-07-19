import api from '../utils/api';

class PondsServices {
  async getPonds() {
    try {
      const response = await api.get('/alerts');
      
      // Handle the nested data structure from API
      const alertData = response.data?.data?.items || response.data?.items || [];
      
      return {
        success: true,
        data: alertData
      };
    } catch (error) {
      console.error('Error fetching alert:', error);
      
      return {
        success: false,
        data: [],
        message: 'Failed to fetch alert data'
      };
    }
  }
}

export const pondsServices = new PondsServices();