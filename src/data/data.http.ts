
import { version } from '$app/environment';
import { Config } from '$src/config';
import { HttpInterceptor } from '$src/core/http.interceptors';
import { Res } from '$src/utils/resources';
import axios, { type AxiosInstance } from 'axios';



export const DataUrl = (url: string) => {
  return Config.API.local[url].replace(':lang', Res.language) + '?v=' + version;
};

export class DataHttpService {
  private static instance: AxiosInstance | null = null;

  static get httpClient(): AxiosInstance {
    if (this.instance) {
      return this.instance;
    }
    const _instance = axios.create({
      baseURL: Config.API.localRoot
    });
    HttpInterceptor(_instance);

    this.instance = _instance;
    return _instance;
  }
}
