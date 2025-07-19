import api from '../utils/api';

class PdfsServices {
  async getPdfs() {
    try {
      console.log('Fetching PDFs data...');
      const response = await api.get('/pdfs');
      console.log('PDFs API response:', response.data);
      
      // Handle the data structure from API
      const pdfsData = response.data?.data || [];
      
      return {
        success: true,
        data: pdfsData
      };
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      
      return {
        success: false,
        data: [],
        message: 'Failed to fetch PDFs data'
      };
    }
  }
}

export const pdfsServices = new PdfsServices(); 