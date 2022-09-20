import axios from 'axios';
import { useContext } from 'react';
import AuthContext
 from '../context/AuthContext';

export const BASE_URL = 'http://127.0.0.1:8000/api/complaints';

export const fetchFromAPI = async(url, options) => {
  const  { authToken, setAuthToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    BASE_URL,
    headers: {Authorization: `Token ${authToken}`}
  })

  // Asynchronously call API and destructure it
  const { data } = await axios.get(`${BASE_URL}/${url}`, {headers: {Authorization: `Token ${authToken}`}});
  
  return data
}