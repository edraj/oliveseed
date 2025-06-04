import type { ClientError } from "@edraj/tsdmart";

export interface IUiError {
  code: number; // dmart error code
  message?: any; // technical as much as possible
  status?: any; // axios status mostly number
  uiCode?: string; // axios codefor client
}

export const UiError = (error: ClientError): IUiError => {
  let e: IUiError = {
    code: 0,
    message: error, // fall back all error
    uiCode: "Unknown",
    status: 0,
  };

  if (error) {
    e.status = error.status;
    e.uiCode = error.code; // axios code
    // look for code inside info
    e.code = error.response?.error?.code || 0;
    let _m = error.response?.error?.type || ""; // validaion
    e.message = _m;
  }
  return e;
};
