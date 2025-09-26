import type { ResponseType } from 'axios';

export interface IClientErrorParam {
  toast?: boolean;
  includeError?: boolean;
  replaceCode?: { from: any, to: any; }[];
}
export interface IClientError {
  code: string;
  status: string;
  message: string;
  request?: {
    url: string;
    method: string;
    responseType?: ResponseType;
  };
  response: any;
  params?: IClientErrorParam;
}

// add other API spaces if used
export enum EnumErrorNamespace {
  DMART = 'dmart',
}

export interface IUiError {
  code: string; // dmart error code
  message?: any; // technical as much as possible
  status?: any; // axios status mostly number
  httpCode?: string; // axios codefor client
  apiCode?: number; // API thrown code
  toast?: boolean;
  origin?: any; // used when full cards errors are needed
}

export const UiError = (error: IClientError): IUiError => {
  let e: IUiError = {
    code: 'Unknown',
    message: error.message, // fall back all error
    httpCode: 'Unknown',
    status: 0,
    toast: true,
    apiCode: 0,
  };

  if (error) {
    e.status = error.status || 400;
    e.httpCode = error.code; // axios code

    // must be false explicitly, else true
    e.toast = error.params?.toast !== false;

    e.apiCode = error.response?.code || error.code || 0;

    if (error.request.responseType === 'blob') {
      if (e.status === 403) {
        e.code = EnumErrorCode.BLOB_UNAUTHORIZED;
      } else {
        e.code = EnumErrorCode.ERROR_IN_BLOB;
      }
    }
    if (error.response?.info?.length) {
      e.apiCode = error.response.info[0].failed?.[0].error_code || e.apiCode;
    }
    let _m = error.response?.type || ''; // validaion

    e.message = _m;

    if (error.params?.includeError) {
      e.origin = error.response;
    }

    if (error.params?.replaceCode?.length) {
      error.params.replaceCode.forEach((r) => {
        if (e.apiCode === r.from) {
          e.apiCode = r.to;
        }
      });
    }
  }
  return e;
};

export enum EnumDmartErrorCode {
  NOT_ALLOWED = 401,
  VALIDATION_ERROR = 422,
  UNPROCESSABLE_ENTITY = 424,
  INVALID_IDENTIFIER = 420,
  INVALID_CONFIRMATION = 427,
  SHORTNAME_ALREADY_EXIST = 400,
  SHORTNAME_DOES_NOT_EXIST = 404,
  INVALID_DATA = 402,
  SOMETHING_WRONG = 430,
  INVALID_HEALTH_CHECK = 403,
  INVALID_APP_KEY = 555,
  INVALID_ROUTE = 230,
  OBJECT_NOT_FOUND = 220,
  INVALID_SPACE_NAME = 203,
  CANNT_DELETE = 204,
  ALREADY_EXIST_SPACE_NAME = 205,
  MISSING_DATA = 202,
  NOT_ALLOWED_LOCATION = 206,
  PROVID_SOURCE_PATH = 222,
  MISSING_DESTINATION_OR_SHORTNAME = 213,
  EMAIL_OR_MSISDN_REQUIRED = 207,
  MISSING_METADATA = 208,
  MISSING_FILTER_SHORTNAMES = 209,
  WORKFLOW_BODY_NOT_FOUND = 218,
  NOT_SUPPORTED_TYPE = 217,
  SOME_SUPPORTED_TYPE = 219,
  TICKET_ALREADY_CLOSED = 299,
  INVALID_TICKET_STATUS = 300,
  DIR_NOT_FOUND = 22,
  LOCK_UNAVAILABLE = 30,
  LOCKED_ENTRY = 31,
  QR_ERROR = 14,
  QR_EXPIRED = 15,
  QR_INVALID = 16,
  INVALID_INVITATION = 125,
  INVALID_PASSWORD_RULES = 17,
  INVALID_USERNAME_AND_PASS = 10,
  USER_ISNT_VERIFIED = 11,
  PASSWORD_NOT_VALIDATED = 13,
  PASSWORD_RESET_ERROR = 102,
  UNMATCHED_DATA = 19,
  USERNAME_NOT_EXIST = 18,
  OTP_INVALID = 307,
  OTP_EXPIRED = 308,
  OTP_FAILED = 104,
  OTP_ISSUE = 100,
  OTP_RESEND_BLOCKED = 103,
  INVALID_STANDALONE_DATA = 107,
  ONE_ARGUMENT_ALLOWED = 101,
  DATA_SHOULD_BE_UNIQUE = 415,
  INVALID_TOKEN = 47,
  EXPIRED_TOKEN = 48,
  NOT_AUTHENTICATED = 49,
  OTP_REQUIRED = 50,
  OBJECT_NOT_SAVED = 51,

  ACCOUNT_LOCKED = 110,
}

export enum EnumErrorCode {
  ERROR_IN_BLOB = 'ERROR_IN_BLOB',
  BLOB_UNAUTHORIZED = 'BLOB_UNAUTHORIZED',
  ERR_NETWORK = 'ERR_NETWORK',
  ECONNABORTED = 'ECONNABORTED'
}
