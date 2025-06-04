import { Translation } from "$src/utils/translation.model";

export enum EnumRole {
  ADMIN = "super_admin",
  USER = "logged_in",
  DEFAULT = "world",
}

export interface IProfile {
  shortname: string;
  email?: string;
  mobile?: string;
  displayname?: string;
  role?: EnumRole;
}

export class Profile {
  static MapRole(roles: string[]): EnumRole {
    if (!roles?.length) return EnumRole.DEFAULT;

    // if more than one role appears, too bad, we'll take the highest
    if (roles.includes(EnumRole.ADMIN)) return EnumRole.ADMIN;
    if (roles.includes(EnumRole.USER)) return EnumRole.USER;
    return EnumRole.DEFAULT;
  }
  static NewInstance(data: any): IProfile {
    return {
      shortname: data.shortname,
      displayname: Translation.MapLanguage(data.displayname),
      email: data.email,
      mobile: data.msisdn,
      role: Profile.MapRole(data.roles),
    };
  }
  static NewInstances(data: any[]): IProfile[] {
    return data.map(Profile.NewInstance);
  }
}
