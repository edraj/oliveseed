import { Config } from "$src/config";
import { HttpService } from '$src/core/http.service';
import { EnumQueryType, EnumRequestType, Param, type IParam } from '../utils/param.model';
import { DmartRecord, type IDmartRecord } from "./record.model";
import { ResourceService } from './resource.service';

export class RecordService {


  static async GetRecords(): Promise<IDmartRecord[]> {
    // create a search query
    const params: IParam = {
      type: EnumQueryType.search,
      space: Config.API.defaultSpace,
      subpath: Config.API.records.list,
      size: 1000,
      withPayload: true,
      withAttachments: true,
    };
    const res = await ResourceService.GetResources(params);
    return DmartRecord.NewInstances(res);
  }

  static async CreateRecord(record: Partial<IDmartRecord>): Promise<IDmartRecord> {

    const res = await ResourceService.CreateResource(record);
    return res;
  }

  static async UpdateRecord(record: IDmartRecord): Promise<void> {
    const req: any = Param.MapRequest({
      space: Config.API.defaultSpace,
      type: EnumRequestType.update,
      records: [DmartRecord.PrepPost(record)],
    });

    await HttpService.httpClient.post(Config.API.resource.request, req);
    return null;
  }

  static async DeleteRecord(record: IDmartRecord): Promise<void> {
    await ResourceService.DeleteResource(record);
    return null;
  }
}
