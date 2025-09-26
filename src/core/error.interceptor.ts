import { goto } from '$app/navigation';
import { AuthState } from '$src/auth/auth.state';
import { Config } from '$src/config';
import { EnumDmartErrorCode, EnumErrorCode, EnumErrorNamespace, type IUiError } from '$src/core/error.model';
import { Toast } from '$src/lib/toast/toast.state';
import { routeLink } from '$src/utils/route';
import type { AxiosInstance } from 'axios';

export function ErrorInterctor(httpClient: AxiosInstance, ns: EnumErrorNamespace) {
  httpClient.interceptors.response.use(null, function (error: IUiError) {
    // update error to match ns

    let code = error.code;
    if (ns) {
      if (ns === EnumErrorNamespace.DMART) {
        code = EnumDmartErrorCode[error.apiCode];
      }
      // add other namespaces here

      // WATCH:
      if (!code) code = EnumErrorCode[error.httpCode] || error.code;
    }

    error.code = code;
    if (error.toast) {
      Toast.HandleUiError(error);
    }
    if (
      [
        EnumDmartErrorCode.NOT_AUTHENTICATED,
        EnumDmartErrorCode.PASSWORD_NOT_VALIDATED,
      ].includes(error.apiCode)
    ) {
      AuthState.Logout(true);
      goto(routeLink(Config.Auth.loginRoute));
    }

    return Promise.reject(error);
  });
}
