import { Config } from "$src/config";
import { Resource, type IResource } from '$src/services/resource.model';
import { makeDate, toISODateString } from "$utils/common";
import { EnumContentType, EnumResourceType } from '../utils/param.model';


export interface IDmartRecord extends IResource {
  date?: Date; // example props, add all that u need
  color?: string;
}

export class DmartRecord {
  static NewInstance(data: any): IDmartRecord {

    const res = Resource.NewInstance(data);
    return {
      ...res,
      date: makeDate(data.date),
      color: data.color,
    };
  }

  static NewInstances(data: any[]): IDmartRecord[] {
    if (!data?.length) return [];
    return data.map(DmartRecord.NewInstance);
  }
  static PrepPost(record: Partial<IDmartRecord>): any {
    return {
      resource_type: EnumResourceType.content,
      shortname: record.shortname,
      subpath: Config.API.records.list,
      attributes: {
        is_active: true,
        displayname: {
          en: record.displayname,
        },
        description: {
          en: record.description,
        },
        payload: {
          content_type: EnumContentType.json,
          body: {
            // example extra prop
            date: toISODateString(record.date),
            color: record.color,
          },
        },
      },
    };
  }
}
