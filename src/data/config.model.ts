
// these are configurations maintained externally
export interface IConfig {
  isServed: boolean;
  withErrors?: boolean;
  API: {
    apiRoot: string;
    queryTimeout?: number;
  };
  Auth: {
    userAccessKey: string;
  };
  Cache: {
    Timeout: number;
    Key: string;
    ResetKey: string;
  };
  Res: {
    languages?: { name: string, display: string; isRtl: boolean, dbvalue: string; }[];
    cookieName: string;
  };

}
