import { AuthInterceptor } from '$src/auth/auth.interceptor';
import { Config } from '$src/config';
import { ErrorInterctor } from '$src/core/error.interceptor';
import axios from 'axios';
import { HttpInterctor } from './http.interceptors';

const httpClient = axios.create({
  baseURL: Config.API.apiRoot,
});

AuthInterceptor(httpClient);
HttpInterctor(httpClient);
ErrorInterctor(httpClient);

export default httpClient;
