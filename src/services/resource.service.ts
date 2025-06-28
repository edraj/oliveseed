import { Config } from '../config';
import httpClient from '../core/http.service';
import { mapRecords, mapResponse } from '../core/response.model';
import { EnumRequestType, Param, type IParam } from '../utils/param.model';
import { Resource, type IResource } from './resource.model';


export class ResourceService {

  static async GetResources(options: IParam = {}): Promise<any[]> {

    const params = Param.MapQueryParams(options);
    const res = await httpClient.post(Config.API.resource.query, {
      ...params
    });
    return mapRecords(res);
  }

  static async GetResource(options: IParam = {}): Promise<IResource> {

    const params = Param.MapQueryParams({ ...options, size: 1 });
    const res = await httpClient.post(Config.API.resource.query, {
      ...params
    });

    return Resource.NewInstance(mapResponse(res));
  }


  private static getRequest(type: EnumRequestType, record: Partial<IResource>): any {
    const req: any = Param.MapRequest({
      space: Config.API.defaultSpace,
      type,
      records: [Resource.PrepPost(record)],
    });
    return { req, url: Config.API.resource.request };

  }

  static async CreateResource(resource: Partial<IResource>): Promise<IResource> {

    const req = this.getRequest(EnumRequestType.create, resource);
    const res = await httpClient.post(req.url, req.req);
    return Resource.NewInstance(mapResponse(res), resource.space);
  }

  static async UpdateResource(resource: IResource): Promise<void> {


    // replace
    const req = this.getRequest(EnumRequestType.update, resource);
    await httpClient.post(req.url, req.req);
    return null;
  }

  static async DeleteResource(resource: IResource): Promise<boolean> {
    const req: any = Param.MapRequest({
      space: resource.space,
      type: EnumRequestType.delete,
      records: [Resource.PrepDelete(resource)],
    });
    await httpClient.post(Config.API.resource.request, req);
    return true;
  }
}
