import api from '../utils/api';

class TipsServices {
  async getTips() {
    try {
      console.log('Fetching tips data...');
      const response = await api.get('/tips');
      console.log('Tips API response:', response.data);
      
      // Handle the nested data structure from API
      const tipsData = response.data?.data?.items || response.data?.items || [];
      
      return {
        success: true,
        data: tipsData
      };
    } catch (error) {
      console.error('Error fetching tips:', error);
      
      return {
        success: false,
        data: [],
        message: 'Failed to fetch tips data'
      };
    }
  }
}

export const tipsServices = new TipsServices(); 