import api from '../utils/api';

class AlertsServices {
  async getAlerts() {
    try {
      console.log('Fetching alerts data...');
      const response = await api.get('/alerts');
      console.log('Alerts API response:', response.data);
      
      // Handle the nested data structure from API
      const alertsData = response.data?.data?.items || response.data?.items || [];
      
      return {
        success: true,
        data: alertsData
      };
    } catch (error) {
      console.error('Error fetching alerts:', error);
      
      return {
        success: false,
        data: [],
        message: 'Failed to fetch alerts data'
      };
    }
  }
}

export const alertsServices = new AlertsServices(); 