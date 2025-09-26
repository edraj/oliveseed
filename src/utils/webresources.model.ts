import { Config } from '$src/config';
import { ConfigService } from '$src/data/config.service';
import { Res } from '$utils/resources';

export interface IWebResource {
  [key: string]: string;
}




export const languageInput = ConfigService.Config.Res.languages.reduce((acc: any, cur) => {
  acc[cur.name] = null;
  return acc;
}, {});


export class WebResource {
  static MapLanguage(prop: IWebResource): string {
    return prop ? prop[Res.language] : '';
  }


  static ApplyLanguage(items: any[]) {
    // return data.items removing unnessary keys as KEU: "valuein right language"
    const _keys = items.reduce(
      (acc: any, cur: any) => ({
        ...acc,
        [cur.key]: cur[Res.language],
      }),
      {}
    );
    Res.setKeys(_keys);
  }

  static MapInput(data: any): { [key: string]: string; } {
    // return en, ar, ke... etc even if null is provided
    return !data ? languageInput : { ...languageInput, ...data };
  }

  static NewInstance(data: string): string {
    if (!data) return null;
    return Config.Res.languages.find((n) => n.dbvalue === data)?.name || Config.Res.defaultLanguage;

  }
  static PrepPost(language: string): string {
    // map en, ar, and ku to their values in db
    return Res.getLanguage(language)?.dbvalue || '';

  }


}
