import dataClient, { DataUrl } from '$src/data/data.http';
import type { IData, TDataType } from '$src/data/data.model';
import { Res } from '$src/utils/resources';
export class DataService {



  static async ApplyWebResources(): Promise<void> {
    // for keys only
    const _errors = await dataClient.get(DataUrl('errors'));
    Res.setKeys(_errors);
  }
  static async GetData(type: TDataType): Promise<IData[]> {
    // nothing, simply get json locally via http
    const res = await dataClient.get(DataUrl(type.toLowerCase()));
    return res.data.data as IData[];

  }

  static async ApplyWebResource(type: TDataType) {
    const res = await dataClient.get(DataUrl(type.toLowerCase()));
    Res.setKeys(res);

  }
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


