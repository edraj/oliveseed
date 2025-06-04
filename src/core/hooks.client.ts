import type { ClientInit, HandleClientError } from "@sveltejs/kit";

import { browser, dev } from "$app/environment";
import { Config } from "$src/config";
import { getCookie, setCookie } from "$utils/common";
import { Res } from "$utils/resources";

export const init: ClientInit = async () => {
  // check language and inject it

  if (browser && dev) {
    window["_indebug"] = true;
    _seqlog("client init");
  }

  let lang = Config.Res.defaultLanguage;

  if (browser) {
    const m = Res.Re.exec(window.location.pathname);
    if (m?.length > 1) {
      lang = m[1];
    } else {
      lang = getCookie(Config.Res.cookieName) || Config.Res.defaultLanguage;
      window.location.href = `/${lang}${window.location.pathname}`;
    }
  }
  setCookie(Config.Res.cookieName, lang, Config.Res.Timeout);

};

export const handleError: HandleClientError = async (error) => {
  // WATCH: i dont believe this is working
  _debug(error, "Unhandled Error", "e");
  _debug(error, "stack", "t");
  return {
    message: "Error",
  };
};
