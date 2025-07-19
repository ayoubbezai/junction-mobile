import api from '../utils/api';

class PondsServices {
  async getPonds() {
    try {
      console.log('Fetching ponds data...');
      const response = await api.get('/ponds');
      console.log('Ponds API response:', response.data);
      
      // Handle the nested data structure from API
      const pondsData = response.data?.data?.items || response.data?.items || [];
      
      return {
        success: true,
        data: pondsData
      };
    } catch (error) {
      console.error('Error fetching ponds:', error);
      
      return {
        success: false,
        data: [],
        message: 'Failed to fetch ponds data'
      };
    }
  }
}

export const pondsServices = new PondsServices();