// export config

export const Config = {
  Basic: {
    defaultOpco: "iq",
    defaultRoute: "/app",
    defaultSize: 25,
    defaultDateFormt: "DD-MM-YYYY",
    defaultUploadSize: 1048576,
    defaultUploadFormat: ["gif", "jpg", "jpeg", "png"],
    defaultToastTimeout: 5000,
    lockTimeout: 100,
  },
  Res: {
    languages: [
      { name: "en", display: "English" },
      { name: "ar", display: "عربي", isRtl: true },
      { name: "ku", display: "کوردی" },
    ],
    defaultLanguage: "en",
    cookieName: "ol-lang",
    Timeout: 365,
  },
  Auth: {
    userAccessKey: "user",
    redirectKey: "redirectUrl",
    loginRoute: "/login"
  },
  Cache: {
    Timeout: 24,
    Key: "oliva.cache",
    ResetKey: "20250101",
  },
  API: {
    apiRoot: import.meta.env.VITE_DMART_URL, // FIXME: move to environment
    defaultSpace: "maqola",
    contentSpace: "Public",
    records: {
      list: "/records",
    },
  },
};
