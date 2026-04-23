import { Config } from '$src/config';
import { _global, toSentenceCase } from './common';

export const res = (res: string, plural: boolean = false, count: number = 1, tocase: string = 'normal'): string => {
  let value = Res.Get(res, '');

  // format: normal or sentence case only
  if (plural) {
    value = Res.Plural(res, count);
  }
  return tocase === 'sentence' ? toSentenceCase(value) : value;
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

export interface IResLanguage {
  name: string;
  isRtl?: boolean;
  dbvalue: string;
  display: string;
}

export class Res {
  private static get keys(): any {
    // TODO: get keys from server

    return _global.ol?.resources.keys || { NoRes: '' };
  }
  public static setKeys(value: any) {
    _global.ol.resources.keys = { ...Res.keys, ...value };
  }

  public static get language(): string {
    return _global.ol?.resources.language || Config.Res.defaultLanguage;
  }

  public static get currentLanguage(): IResLanguage {
    return Res.getLanguage(Res.language);
  }

  public static getLanguage(lang: string): IResLanguage | null {
    return Config.Res.languages.find((n) => n.name === lang);
  }
  public static setLanguage(lang: string) {
    // set res language once

    if (_global.ol?.resources) {
      _global.ol.resources.language = lang;
    }
  }

  public static get direction(): 'rtl' | 'ltr' {
    return Res.currentLanguage?.isRtl ? 'rtl' : 'ltr';
  }

  private static _reCache: RegExp | null = null;
  public static get Re(): RegExp {
    if (!Res._reCache) {
      const languages = Config.Res.languages.map((l) => l.name);
      Res._reCache = new RegExp(`^\/(${languages.join('|')})`, 'gim');
    }
    // reset lastIndex since the regex uses the 'g' flag
    Res._reCache.lastIndex = 0;
    return Res._reCache;
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
    const _pluralCats = Object.keys(_key).sort((a, b) => parseFloat(b) - parseFloat(a));
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
    return factor.replace('$0', count);
  }

  public static Select(key: string, select: any, fallback?: string): string {
    // find the match in resources
    const keys = Res.keys;
    const _fallback = fallback || select;

    return (keys[key] && keys[key][select]) || _fallback || keys.NoRes;
  }
}
