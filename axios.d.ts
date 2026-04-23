import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    context?: string;
    errorContext?: {
      toast?: boolean;
      includeError?: boolean;
      swap?: { from: any, to: any; }[];
    };
  }

  export interface InternalAxiosRequestConfig {
    context?: string;
    errorContext?: {
      toast?: boolean;
      includeError?: boolean;
      swap?: { from: any, to: any; }[];
    };
  }
}
