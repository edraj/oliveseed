import { AuthInterceptor } from '$src/auth/auth.interceptor';
import { Config } from '$src/config';
import { ErrorInterctor } from '$src/core/error.interceptor';
import { EnumErrorNamespace } from '$src/core/error.model';
import { ConfigService } from '$src/data/config.service';
import axios, { type AxiosInstance } from 'axios';
import { HttpInterceptor } from './http.interceptors';


export function createHttpClient(config: { url: string; timeout: number; }, ns = EnumErrorNamespace.DMART) {
  const httpClient = axios.create({
    baseURL: config.url,
    timeout: config.timeout,
  });


  AuthInterceptor(httpClient);
  HttpInterceptor(httpClient);
  ErrorInterctor(httpClient, ns);
  return httpClient;
}

export class HttpService {
  private static instance: AxiosInstance | null = null;

  static get httpClient(): AxiosInstance {
    if (this.instance) {
      return this.instance;
    }
    const _instance = createHttpClient(
      {
        url: Config.API.root + ConfigService.Config.API.apiRoot,
        timeout: ConfigService.Config.API.queryTimeout,
      },
      EnumErrorNamespace.DMART
    );
    this.instance = _instance;
    return _instance;
  }
}
