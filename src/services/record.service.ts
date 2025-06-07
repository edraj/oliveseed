import httpClient from '$core/http.service';
import { Config } from "$src/config";
import { mapRecords } from "$src/core/response.model";
import { EnumQueryType, EnumRequestType } from '@edraj/tsdmart/client';
import { DmartRecord, type IDmartRecord } from "./record.model";

export class RecordService {
  static async GetRecords(): Promise<IDmartRecord[]> {
    // create a search query
    const res = await httpClient.query({
      type: EnumQueryType.search,
      retrieve_attachments: true,
      retrieve_json_payload: true,
      space_name: Config.API.defaultSpace,
      limit: 1000,
      subpath: Config.API.records.list,
      search: "",
    });
    return DmartRecord.NewInstances(mapRecords(res)?.records);
  }

  static async CreateRecord(record: Partial<IDmartRecord>): Promise<void> {
    const req: any = {
      space_name: Config.API.defaultSpace,
      request_type: EnumRequestType.create,
      records: [DmartRecord.PrepPost(record)],
    };
    await httpClient.request(req);
    return null;
  }

  static async UpdateRecord(record: IDmartRecord): Promise<void> {
    const req: any = {
      space_name: Config.API.defaultSpace,
      request_type: EnumRequestType.update,
      records: [DmartRecord.PrepPost(record)],
    };
    await httpClient.request(req);
    return null;
  }

  static async DeleteRecord(record: IDmartRecord): Promise<void> {
    const req: any = {
      space_name: Config.API.defaultSpace,
      request_type: EnumRequestType.delete,
      records: [DmartRecord.PrepPost(record)],
    };

    await httpClient.request(req);
    return null;
  }
}
