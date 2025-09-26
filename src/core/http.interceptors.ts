import { Loader } from '$src/lib/loader/loader.state';
import type { AxiosInstance } from 'axios';
import { UiError, type IClientError } from './error.model';

export const HttpInterctor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.request.use(
    function (config) {

      let _m = `Request ${config.method} ${config.url}`;

      if (config.data?.subpath) {
        _m += config.data.subpath;
      }
      if (config.data?.search) {
        _m += config.data.search;
      }

      Loader.show('API');
      _debug(config.data, _m, 'p');
      return config;
    },
    function (error) {
      Loader.hide('API');
      _debug(error, `Request Error ${error.request}`, 'e');
      // WATCH: not sure about it
      const e = UiError(error);
      return Promise.reject(e);
    }
  );
  httpClient.interceptors.response.use(
    function (response) {
      Loader.hide('API');
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
        params: error.response?.config?.params || error.config?.params
      };

      const e = UiError(err);

      Loader.hide('API');
      _debug(
        { uiError: e, dmartError: err.response },
        `Response error ${err.code}: ${err.request?.method} ${err.request?.url}`,
        'e'
      );
      return Promise.reject(e);
    }
  );
};
