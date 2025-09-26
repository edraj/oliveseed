// export config

import { base } from '$app/paths';

export const Config = {
  isServed: false,
  Basic: {
    defaultRoute: '/',
    appRoot: '/app',
    defaultSize: 25,
    defaultDateFormt: 'DD-MM-YYYY',
    defaultUploadSize: 1048576,
    defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
    defaultToastTimeout: 5000,
    lockTimeout: 100,
    dblClickTimeout: 2000,
  },
  Res: {
    languages: [
      { name: 'en', display: 'English', isRtl: false, dbvalue: 'english' },
      { name: 'ar', display: 'عربي', isRtl: true, dbvalue: 'arabic' },
      { name: 'ku', display: 'کوردی', isRtl: true, dbvalue: 'kurdish' },
    ],
    defaultLanguage: 'en',
    cookieName: 'ol-lang',
    Timeout: 365,
  },
  Auth: {
    userAccessKey: 'user',
    redirectKey: 'redirectUrl',
    loginRoute: '/login',
    resetRoute: '/auth/password',
    resetCode: 'CHANGE_PASSWORD',
  },
  Cache: {
    Timeout: 24,
    Key: 'oliva.cache',
    ResetKey: '20250101',
  },
  API: {
    apiRoot: import.meta.env.VITE_DMART_URL, // written by config service
    queryTimeout: 10000,
    defaultSpace: 'maqola',
    autoShortname: 'auto',
    local: {
      // static json files
      errors: `${base}/locale/errors.:lang.json`,
      config: `${base}/config.json`
    },
    data: {
      // add subpaths to content that needs to be preloaded and chached
    },
    // optional, not necessary
    records: {
      list: '/records',
    },
    auth: {
      login: '/user/login',
      logout: '/user/logout',
      profile: '/user/profile',
      reset: '/user/password-reset-request',
      protected: '/user/:shortname/protected',
      path: '/users'
    },
    public: {
      query: '/public/query',
      space: 'public' // i may not exist in the implement dmart
    },
    resource: {
      query: '/managed/query',
      csv: '/managed/csv',
      space: '/managed/space',
      request: '/managed/request',
    },
    payload: {
      file: '/managed/resource_with_payload',
      files: '/managed/resource_with_payload',
      url: '/:scope/payload/:resource/:space/:subpath/:shortname.:ext',
    },
    ticket: {
      progress: '/managed/progress-ticket/:space/:subpath/:shortname/:action',
    },
  },
};
