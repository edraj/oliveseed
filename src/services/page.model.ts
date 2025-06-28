import { Resource, type IResource } from '$src/services/resource.model';

export interface IPage extends IResource {
  body?:string;
}

export class Page {
  static NewInstance(data: any): IPage {
    const res = Resource.NewInstance(data);
    return {
      ...res,
      body: data.body
    };
  }

  static NewInstances(data: any[]): IPage[] {
    // retrun array of IPages
    if (!data?.length) return [];
    return data.map(Page.NewInstance);
  }
}
