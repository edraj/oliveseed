import { Config } from "$src/config";
import { Res } from "$utils/resources";
import type { Handle } from "@sveltejs/kit";

export const LanguageHook: Handle = async ({ event, resolve }) => {

  let lang = Config.Res.defaultLanguage;
  const m = Res.Re.exec(event.url.pathname);
  if (m?.length > 1) {
    lang = m[1];
  } else {
    lang =
      event.cookies.get(Config.Res.cookieName) || Config.Res.defaultLanguage;
  }

  const result = await resolve(event, {
    transformPageChunk: ({ html }) => {
      // here, manipulate html based on language
      const reLTR = /<!-- #LTR -->([\s\S]*?)<!-- #ENDLTR -->/gim;
      const reRTL = /<!-- #RTL -->([\s\S]*?)<!-- #ENDRTL -->/gim;
      const reLang = /\$lang/gim;
      let contents = html;
      // TODO: move lang to a config file
      if (lang === "ar") {
        // remove reLTR
        contents = contents.replace(reLTR, "");
        // strip reRTL
        contents = contents.replace(reRTL, "$1");
      } else {
        contents = contents.replace(reRTL, "");
        // strip reLTR
        contents = contents.replace(reLTR, "$1");
      }
      //  replace lang
      contents = contents.replace(reLang, lang);

      return contents;
    },
  });

  return result;
};
