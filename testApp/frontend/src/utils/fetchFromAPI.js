import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';

export const fetchFromAPI = async(url, options) => {
  // Asynchronously call API and destructure it
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  
  return data
}