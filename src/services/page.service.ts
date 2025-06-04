import httpClient from '$core/http.service';
import { Config } from "$src/config";
import { mapRecords, mapResource } from "$src/core/response.model";
import { DataCache } from '$src/data/data.decorator';
import { SiteStorage, type StorageService } from '$src/data/storage.service';
import { Res } from "$utils/resources";
import { QueryType, ResourceType } from "@edraj/tsdmart";
import { Page, type IPage } from "./page.model";

export class PageService {

  public static storageService: StorageService = SiteStorage;

  @DataCache({ expiresin: 24*30 })
  static async GetPages(): Promise<IPage[]> {
    // create a search query
    // TODO: search only those with specific language, and isActive

    const res = await httpClient.query(
      {
        type: QueryType.search,
        space_name: Config.API.contentSpace,
        retrieve_attachments: false,
        retrieve_json_payload: false,
        limit: 1000,
        subpath: "/"+ Res.language,
        search: "",
      },
      "public"
    );

    return Page.NewInstances(mapRecords(res)?.records);
  }

  static async GetPage(shortname: string): Promise<IPage> {
    // managed/entry/:resource/:space/:subpath?:options'
    const res = await httpClient.retrieve_entry(
      ResourceType.content,
      Config.API.contentSpace,
      Res.language,
      shortname,
      true,
      true
    );
    return Page.NewInstance(mapResource(res));
  }
}
