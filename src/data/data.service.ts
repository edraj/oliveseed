import dataClient, { DataUrls } from '$src/data/data.http';
import type { IData, TDataType } from '$src/data/data.model';
import { Res } from '$src/utils/resources';
export class DataService {



  static async GetWebResources(): Promise<void> {
    // for keys only
    const roles = await dataClient.get(DataUrls.roles);
    Res.setKeys(roles?.data);
    const reports = await dataClient.get(DataUrls.reports);
    Res.setKeys(reports?.data);
  }

  static async GetData(type: TDataType, id: string = '0'): Promise<IData[]> {
    // nothing, simply get json locally via http
    const res = await dataClient.get(DataUrls[type.toLowerCase()]);
    return res.data.data as IData[];

  }

  // static async GetRoles(): Promise<IData[]> {
  //   return DataService.GetData('Roles');
  // }

  static async GetSingleDataByKey(
    type: TDataType,
    shortname: string
  ): Promise<IData | undefined> {

    if (shortname === null) {
      return undefined;
    }

    const getFunction = DataService['Get' + type];
    if (!getFunction) {
      return undefined;
    }
    const res = await getFunction();
    return res.find((n) => n.shortname === shortname);
  }



}


