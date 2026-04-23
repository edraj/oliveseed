import { Res } from '$src/utils/resources';
import type { AxiosInstance } from 'axios';
import { Config } from '../config';
import { AuthState } from './auth.state';


export function AuthInterceptor(httpClient: AxiosInstance) {

  httpClient.interceptors.request.use(
    (config) => {
      // if url is login, do not include authorization no matter what
      const _token = AuthState.GetToken();
      if (!config.url?.includes(Config.API.auth.login) && _token) {
        config.headers['Authorization'] = `Bearer ${_token}`;
      } else {
        config.headers['Authorization'] = null;
      }
      config.headers['Accept-Language'] = Res.language;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

};
