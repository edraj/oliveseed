import type { AxiosInstance } from 'axios';
import { Config } from '../config';
import { AuthState } from './auth.state';


export function AuthInterceptor(httpClient: AxiosInstance) {

  httpClient.interceptors.request.use(
    (config) => {
      // if url is login, do not include authorization no matter what
      if (!config.url?.includes(Config.API.auth.login) && AuthState.GetToken()) {
        config.headers['Authorization'] = `Bearer ${AuthState.GetToken()}`;
      } else {
        config.headers['Authorization'] = '';
      }
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

};
