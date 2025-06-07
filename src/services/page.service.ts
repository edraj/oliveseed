import { EnumQueryType, EnumResourceType } from '@edraj/tsdmart/client';
import { Config } from '../config';
import httpClient from '../core/http.service';
import { mapRecords, mapResource } from '../core/response.model';
import { Res } from '../utils/resources';
import { Page, type IPage } from './page.model';

export class PageService {
  static async GetPages(): Promise<IPage[]> {
    // create a search query
    // TODO: search only those with specific language, and isActive
    const res = await httpClient.query({
      type: EnumQueryType.search,
      space_name: Config.API.contentSpace,
      retrieve_attachments: false,
      retrieve_json_payload: false,
      limit: 1000,
      subpath: '/' + Res.language,
      search: '',
    },
      'public');

    return Page.NewInstances(mapRecords(res)?.records);
  }

  static async GetPage(shortname: string): Promise<IPage> {
    // managed/entry/:resource/:space/:subpath?:options'
    const res = await httpClient.retrieve_entry({
      resource_type: EnumResourceType.content,
      space_name: Config.API.contentSpace,
      subpath: '/' + Res.language,
      shortname,
      retrieve_json_payload: true,
      retrieve_attachments: true
    },
      'public');
    return Page.NewInstance(mapResource(res));
  }
}
