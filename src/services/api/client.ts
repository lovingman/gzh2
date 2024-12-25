import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { requestInterceptor, responseInterceptor } from './interceptors';

export const apiClient = axios.create({
  ...API_CONFIG,
  withCredentials: false
});

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  responseInterceptor.success,
  responseInterceptor.error
);

export default apiClient;