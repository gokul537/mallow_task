import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

// A utility function for showing toast messages based on status codes
const showToastMessage = (status) => {
  switch (status) {
    case 200:
      toast.success('Request successful!');
      break;
    case 201:
      toast.success('Created successfully!');
      break;
    case 204:
      toast.success('Deleted successfully!');
      break;
    case 400:
      toast.error('Bad Request. Please check your input.');
      break;
    case 401:
      toast.error('Unauthorized. Please log in.');
      break;
    case 403:
      toast.error('Forbidden. You do not have access.');
      break;
    case 404:
      toast.error('Not Found. The requested resource does not exist.');
      break;
    case 500:
      toast.error('Internal Server Error. Please try again later.');
      break;
    default:
      toast.info('Something happened!');
      break;
  }
};

// Generic API service
const apiService = {
  get: async (url) => {
    try {
      const response = await axios.get(url);
      showToastMessage(response.status); // Show a toast message based on the status code
      return response.data;
    } catch (error) {
      handleApiError(error); // Handle errors globally
      throw error;
    }
  },

  getpram: async (url, config = {}) => {
    try {
      const response = await axios.get(url, config); // Pass config with params
      showToastMessage(response.status); // Show a toast message based on the status code
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  
  post: async (url, data) => {
    try {
      const response = await axios.post(url, data);
      showToastMessage(response.status); // Show a toast message based on the status code
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  put: async (url, data) => {
    try {
      const response = await axios.put(url, data);
      showToastMessage(response.status); // Show a toast message based on the status code
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  delete: async (url) => {
    try {
      const response = await axios.delete(url);
      showToastMessage(response.status); // Show a toast message based on the status code
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};

// A helper function to handle errors globally
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status outside the 2xx range
    showToastMessage(error.response.status); // Show a toast message based on the status code
  } else if (error.request) {
    // Request was made but no response received
    toast.error('No response from the server. Please check your network connection.');
  } else {
    // Something else caused the error
    toast.error('An unexpected error occurred. Please try again.');
  }
};

export default apiService;
