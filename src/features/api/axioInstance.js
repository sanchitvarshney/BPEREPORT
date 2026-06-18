import axios from 'axios';
import { getToken } from 'helper/getToken';
import { getFinancialSessionForRequest } from 'helper/indianFinancialYear';
import { showToast } from 'utils/ToastProvider';
import { v4 as uuidv4 } from 'uuid';
import { storeReturnTo } from 'utils/authRedirect';
import { getApiBaseUrl } from 'utils/apiSettings';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(async (config) => {
  config.baseURL = getApiBaseUrl();
  const token = getToken();

  if (token) {
    const uniqueid = uuidv4();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['authorization'] = token;
    config.headers['session'] = getFinancialSessionForRequest();
    config.headers['x-click-token'] = uniqueid;
    // config.headers["ngrok-skip-browser-warning"] = "69420";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      storeReturnTo(`${globalThis.location.pathname}${globalThis.location.search}`);
      localStorage.clear();
      globalThis.location.href = '/login';
    }
    showToast(error.response?.data?.message?.msg ? error.response?.data?.message?.msg : error.response?.data?.message || "Something went wrong", 'error');
    return Promise.reject(error);
  }
);

export default axiosInstance;
