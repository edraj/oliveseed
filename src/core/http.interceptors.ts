import { Loader } from '$src/lib/loader/loader.state';
import type { AxiosInstance } from 'axios';
import { UiError, type IClientError } from './error.model';

export const HttpInterceptor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(
    function (config) {
      let _m = `Request ${config.method} ${config.url}`;

      if (config.data?.subpath) {
        _m += config.data.subpath;
      }
      if (config.data?.search) {
        _m += config.data.search;
      }
      Loader.show(config.context || 'API');
      _debug(config.data, _m, 'p');
      return config;
    },
    function (error) {
      Loader.hide(error.request?.config?.context || 'API');
      _debug(error, `Request Error ${error.request}`, 'e');

      const e = UiError(error);
      return Promise.reject(e);
    }
  );
  httpClient.interceptors.response.use(
    function (response) {
      Loader.hide(response.config?.context || 'API');
      let _m = `${response.config.method.toUpperCase()} ${response.config.url}`;

      if (response.config.data && typeof response.config.data === 'string') {
        const data = JSON.parse(response.config.data);
        if (data.subpath) {
          _m += data.subpath;
        }
        if (data.search) {
          _m += data.search;
        }
      }
      _debug(response.data, _m, 'p');
      return response.data;
    },
    function (error: any) {
      Loader.hide(error.response?.config?.context || 'API');

      const err: IClientError = {
        code: error.code,
        status: error.status,
        message: error.message,
        request: {
          url: error.response?.config?.url,
          method: error.response?.config?.method,
          responseType: error.response?.config?.responseType,
        },
        response: error.response?.data?.error,
        params: error.response?.config?.params || error.config?.params,
        errorContext: error.response?.config?.errorContext
      };

      const e = UiError(err);

      _debug(
        { uiError: e, originalResponse: err.response },
        `Response error ${err.code}: ${err.request?.method} ${err.request?.url}`,
        'e'
      );
      return Promise.reject(e);
    }
  );
};
