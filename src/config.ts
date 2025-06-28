// export config

export const Config = {
  Basic: {
    defaultRoute: '/',
    appRoot: '/app',
    defaultSize: 25,
    defaultDateFormt: 'DD-MM-YYYY',
    defaultUploadSize: 1048576,
    defaultUploadFormat: ['gif', 'jpg', 'jpeg', 'png'],
    defaultToastTimeout: 5000,
    lockTimeout: 100,
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
    errorCode: 49,
  },
  Cache: {
    Timeout: 24,
    Key: 'oliva.cache',
    ResetKey: '20250101',
  },
  API: {
    apiRoot: import.meta.env.VITE_DMART_URL, // FIXME: move to environment
    defaultSpace: 'maqola',
    rootSpace: 'management',
    contentSpace: 'Public',
    personalSpace: 'personal',
    autoShortname: 'auto',
    records: {
      list: '/records',
    },

    auth: {
      login: '/user/login',
      logout: '/user/logout',
      profile: '/user/profile',
    },
    users: {
      list: '/users',
    },
    public: {
      query: '/public/query',
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
