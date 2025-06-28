import { goto } from '$app/navigation';
import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import type { IUiError } from '$src/core/error.model';
import { Toast } from '$src/lib/toast/toast.state';
import { routeLink } from '$src/utils/route';
import type { AxiosInstance } from 'axios';

export const ErrorInterctor = (httpClient: AxiosInstance) => {
  httpClient.interceptors.response.use(
    null,
    function (error: IUiError) {
      if (error.toast) {
        Toast.HandleUiError(error);
      }
      // FIXME:
      // if error is 401, what to do? relogin is not the solution
      if (error.code === Config.Auth.errorCode) {
        AuthState.Logout(true);
        goto(routeLink(Config.Auth.loginRoute));
      }
      return Promise.reject(error);
    }
  );
};
