import axios from "axios";

const BASE_URL = 'https://hrapp-backend-2gl0.onrender.com'; 
const useAxios = () => {
  const get = async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  };

  const patch = async (endpoint, data) => {
    try {
      const response = await axios.patch(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`PATCH ${endpoint} failed:`, error);
      throw error;
    }
  };

  return { get, post, patch };
};

export default useAxios;
