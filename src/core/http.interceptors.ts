import { type ClientError } from "@edraj/tsdmart";
import { UiError } from './error.model';

export const HttpInterctor = (dmartClient) => {
  dmartClient.interceptors.request.use(
    function (config) {
      let _m = `Request ${config.method} ${config.url}`;

      if (config.data?.subpath) {
        _m += config.data.subpath;
      }
      if (config.data?.search) {
        _m += config.data.search;
      }
      _debug(config.data, _m, "p");
      return config;
    },
    function (error) {
      _debug(error, `Request Error ${error.request}`, "e");
      // WATCH: not sure about it
      const e = UiError(error);
      return Promise.reject(e);
    }
  );

  dmartClient.interceptors.response.use(
    function (response) {
      let _m = `${response.config.method.toUpperCase()} ${response.config.url}`;

      if (response.config.data && typeof response.config.data === "string") {

        const data = JSON.parse(response.config.data);
        if (data.subpath) {
          _m += data.subpath;
        }
        if (data.search) {
          _m += data.search;
        }
      }
      _debug(response.data, _m, "p");
      return response;
    },
    function (error: ClientError) {
      const e = UiError(error);

      _debug(
        { uiError: e, dmartError: error.response?.error },
        `Response error ${error.code}: ${error.request?.method} ${error.request?.url}`,
        "e"
      );
      return Promise.reject(e);
    }
  );
};
