import { HttpService } from '$src/core/http.service';
import { Config } from '../config';
import { mapRecords, mapResponse } from '../core/response.model';
import { EnumQueryType, Param, type IParam } from '../utils/param.model';
import { Res } from '../utils/resources';
import { Page, type IPage } from './page.model';

export class PageService {
  static async GetPages(): Promise<IPage[]> {
    // create a search query
    const params: IParam = {
      type: EnumQueryType.search,
      space: Config.API.public.space,
      subpath: '/' + Res.language,
      size: 1000,
      withPayload: false,
      withAttachments: false,
      keyword: ''
    };

    const res = await HttpService.httpClient.post(Config.API.public.query, Param.MapQueryParams(params));

    return Page.NewInstances(mapRecords(res));
  }

  static async GetPage(shortname: string): Promise<IPage> {
    // managed/entry/:resource/:space/:subpath?:options
    const params: IParam = {
      type: EnumQueryType.search,
      space: Config.API.public.space,
      subpath: '/' + Res.language,
      size: 1,
      withPayload: true,
      withAttachments: true,
      shortname,
      keyword: '',
    };

    const res = await HttpService.httpClient.post(Config.API.public.query, Param.MapQueryParams(params));

    return Page.NewInstance(mapResponse(res));
  }
}
