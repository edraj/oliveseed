import { Config } from "$src/config";
import { _global, toSentenceCase } from "./common";

export const res = (
  res: string,
  plural: boolean = false,
  count: number = 1,
  tocase: string = "normal"
): string => {
  let value = Res.Get(res, "");

  // format: normal or sentence case only
  if (plural) {
    value = Res.Plural(res, count);
  }
  return tocase === "sentence" ? toSentenceCase(value) : value;
};
export const translate = (
  original: string,
  res: string,
  count: number | null = null,
  select: string | null = null
): string => {
  if (count !== null) {
    return Res.Plural(res, count, original);
  }
  if (select !== null) {
    return Res.Select(res, select, original);
  }

  return Res.Get(res, original);
};

export class Res {
  private static get keys(): any {
    return _global.cl?.resources.keys || { NoRes: "" };
  }

  public static get language(): string {
    return _global.cl?.resources.language || Config.Res.defaultLanguage;
  }

  public static get currentLanguage(): {
    name: string;
    display: string;
    isRtl?: boolean;
  } {
    return Config.Res.languages.find((n) => n.name === Res.language);
  }

  public static get Re(): any {
    const langages = Config.Res.languages.map((l) => l.name);
    return new RegExp(`^\/(${langages.join("|")})`, "gim");
  }

  public static Get(key: string, fallback?: string): string {
    // if found return else generic
    const keys = Res.keys;

    if (keys[key]) {
      return keys[key];
    }

    return fallback || keys.NoRes;
  }

  public static Plural(key: string, count: number, fallback?: string): string {
    const keys = Res.keys;

    const _key = keys[key];
    if (!_key) {
      return fallback || keys.NoRes;
    }
    // sort keys desc
    const _pluralCats = Object.keys(_key).sort(
      (a, b) => parseFloat(b) - parseFloat(a)
    );
    // for every key, check if count is larger or equal, if so, break

    // default is first element (the largest)
    let factor = _key[_pluralCats[0]];

    for (let i = 0; i < _pluralCats.length; i++) {
      if (count >= parseFloat(_pluralCats[i])) {
        factor = _key[_pluralCats[i]];
        break;
      }
    }
    // replace and return;
    return factor.replace("$0", count);
  }

  public static Select(key: string, select: any, fallback?: string): string {
    // find the match in resources
    const keys = Res.keys;

    return (keys[key] && keys[key][select]) || fallback || keys.NoRes;
  }
}
