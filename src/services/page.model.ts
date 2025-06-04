import { Translation } from "$src/utils/translation.model";

export interface IPage {
  displayname?: string;
  shortname: string;
  description?: string;
  body?:string;
}

export class Page {
  static NewInstance(data: any): IPage {
    return {
      shortname: data.shortname,
      displayname: Translation.MapLanguage(data.displayname),
      body: data.body
    };
  }

  static NewInstances(data: any[]): IPage[] {
    // retrun array of IPages
    if (!data?.length) return [];
    return data.map(Page.NewInstance);
  }
}
